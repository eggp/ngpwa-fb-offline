import {Component, NgZone, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menu: { name: string, path: string }[] = [
    {
      name: 'chat',
      path: 'chat'
    }
  ];

  constructor(private ngZone: NgZone) {

  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(
      () => firebase.initializeApp(environment.firebase)
    );
  }
}
