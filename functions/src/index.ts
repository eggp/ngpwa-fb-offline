// import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as moment from 'moment';
import {ChatMessageModel} from '../../models/chat-message.model';
import {Event} from 'firebase-functions/lib/cloud-functions';
import {DeltaDocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import 'moment/locale/hu';

moment.locale('hu');
// admin.initializeApp(functions.config().firebase);

export const chatAddCreatedUnixTimestamp = functions.firestore
  .document('chat/{msgId}')
  .onCreate(
    (event: Event<DeltaDocumentSnapshot>) => {
      const data: ChatMessageModel = event.data.data();
      data.created = moment().add(1, 'hours').format('HH:mm');

      return event.data.ref.set({...data}, {merge: true});
    }
  );
