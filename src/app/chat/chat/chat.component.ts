import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/operators/refCount';
import 'firebase/firestore';
import {ChatMessageModel} from '../../../../models/chat-message.model';
import {ChatService} from '../chat.service';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
  msgList$: Observable<ChatMessageModel[]>;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.msgList$ = this.chatService.msgList$;
  }

  saveMsg(msg: string) {
    this.chatService.addNewMsg(msg);
  }
}
