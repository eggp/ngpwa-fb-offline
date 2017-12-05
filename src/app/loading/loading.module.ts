import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './loading/loading.component';
import {MatProgressBarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,

    FlexLayoutModule,

    MatProgressBarModule
  ],
  declarations: [LoadingComponent],
  exports: [
    LoadingComponent,
    MatProgressBarModule,
    FlexLayoutModule
  ]
})
export class LoadingModule {
}
