import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat/chat.component';
import {FormComponent} from './form/form.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MessageItemComponent} from './message-item/message-item.component';
import {MessageListComponent} from './message-list/message-list.component';
import {LoadingModule} from '../loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatRoutingModule,

    FlexLayoutModule,

    // Material
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,

    LoadingModule
  ],
  declarations: [
    ChatComponent,
    FormComponent,
    MessageItemComponent,
    MessageListComponent
  ],
  exports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule
  ]
})
export class ChatModule {
}
