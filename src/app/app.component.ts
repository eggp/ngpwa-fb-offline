import {AfterViewInit, Component, NgZone} from '@angular/core';
import {environment} from '../environments/environment';
import * as firebase from 'firebase';
import {AppUpdateService} from './app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  menu: { name: string, path: string }[] = [
    {
      name: 'chat',
      path: 'chat'
    }
  ];

  constructor(private ngZone: NgZone, private appUpdateService: AppUpdateService) {
    if (environment.production && this.appUpdateService != null) {
      this.appUpdateService.initUpdateWatcher();
    }
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(
      () => firebase.initializeApp(environment.firebase)
    );
  }

}
