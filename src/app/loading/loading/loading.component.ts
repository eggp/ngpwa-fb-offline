import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent {
  @HostBinding('style.width') width = '100%';
}
