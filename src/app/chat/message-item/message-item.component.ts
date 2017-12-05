import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {ChatMessageModel} from '../../../../models/chat-message.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent implements OnChanges, AfterViewInit {
  @Input() msg: ChatMessageModel;
  @Input() last = false;
  @HostBinding('class.saving') classSaving = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['msg'] !== undefined) {
      const msg: ChatMessageModel = changes['msg'].currentValue;
      if (msg.created === 'néhány másodperce' && this.classSaving === false) {
        this.classSaving = true;
      } else if (msg.created !== 'néhány másodperce' && this.classSaving === true && !changes['msg'].isFirstChange()) {
        this.classSaving = false;
      }

      this.cdr.detectChanges();
    }
  }
}
