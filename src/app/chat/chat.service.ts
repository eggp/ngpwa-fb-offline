import {Injectable, NgZone} from '@angular/core';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/operators/refCount';
import 'firebase/firestore';
import {ChatMessageModel} from '../../../models/chat-message.model';
import {of} from 'rxjs/observable/of';

declare const Fingerprint2: any;

type updateCallback = (current: ChatMessageModel[]) => ChatMessageModel[];

@Injectable()
export class ChatService {
  private fsDb: firebase.firestore.Firestore;
  private chatMessageCollectionRef: firebase.firestore.CollectionReference;
  private update$: Subject<ChatMessageModel[] | updateCallback> = new Subject<ChatMessageModel[] | updateCallback>();
  private userId: string;

  constructor(private ngZone: NgZone) {
    new Fingerprint2().get(result => this.userId = result);

    this.initChatControlStreams();

    /**
     * enable firestore offline mode
     * https://firebase.google.com/docs/firestore/manage-data/enable-offline
     */
    this.ngZone.runOutsideAngular(() => {
      firebase.firestore().enablePersistence().then(
        () => {
          this.fsDb = firebase.firestore();

          this.chatMessageCollectionRef = this.fsDb.collection('chat');

          this.chatMessageCollectionRef
            .orderBy('created', 'asc')
            .onSnapshot({includeQueryMetadataChanges: true}, (snapshot) => {
              const updateMsgs: ChatMessageModel[] = [];
              snapshot.docChanges.forEach((change) => {
                if (['added', 'modified'].indexOf(change.type) > -1) {
                  updateMsgs.push(new ChatMessageModel(Object.assign(change.doc.data() as ChatMessageModel, {$key: change.doc.id})));
                }

                const source = snapshot.metadata.fromCache ? 'local cache' : 'server';
                // console.log('Data came from ' + source);
              });

              this.ngZone.run(() => {
                if (updateMsgs.length > 0) {
                  this.update$.next(
                    (current: ChatMessageModel[]) => {

                      updateMsgs.forEach(
                        update => {
                          const index = current.findIndex(model => model.$key === update.$key);
                          if (index > -1) {
                            current[index] = update;
                          } else {
                            current.unshift(update);
                          }
                        }
                      );

                      return [...current];
                    }
                  );
                }
              });
            });
        }
      )
        .catch(function (err) {
          if (err.code === 'failed-precondition') {
            alert('Multiple tabs open, persistence can only be enabled in one tab at a a time');
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
          } else if (err.code === 'unimplemented') {
            alert('The current browser does not support all of the features required to enable persistence');
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
          }
        });
    });
  }

  private _msgList$: Observable<ChatMessageModel[]>;

  get msgList$(): Observable<ChatMessageModel[]> {
    return this._msgList$;
  }

  addNewMsg(msg: string) {
    const ref = this.chatMessageCollectionRef.doc();
    const newId: string = ref.id;

    this.update$.next([new ChatMessageModel({$key: newId, 'msg': msg, created: 'néhány másodperce', createdUser: this.userId})]);

    return of(ref.set({'msg': msg, createdUser: this.userId}));
  }

  private initChatControlStreams() {
    this._msgList$ = this.update$
      .scan((current: ChatMessageModel[], newMessages: ChatMessageModel[] | updateCallback) => {
        if (typeof newMessages === 'function') {
          return newMessages(current);
        } else {
          return newMessages.concat(current);
        }
      }, []).publishReplay(1).refCount() as Observable<ChatMessageModel[]>;
  }
}
