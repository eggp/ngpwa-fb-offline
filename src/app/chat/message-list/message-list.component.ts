import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ChatMessageModel} from '../../../../models/chat-message.model';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('.5s ease-out', style({opacity: '1'})),
      ]),
    ]),
  ],
})
export class MessageListComponent implements AfterViewInit, OnChanges {
  @Input() msgList: ChatMessageModel[];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['msgList'] !== undefined
      && !changes['msgList'].isFirstChange()) {
      this.cdr.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }

  trackByFn(index: number, model: ChatMessageModel) {
    return model.$key;
  }
}
