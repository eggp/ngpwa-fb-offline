import {Injectable, NgZone} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AppUpdateService {
  /**
   * sec
   * @type {number}
   */
  private updateStart = 15;
  /**
   * sec
   * @type {number}
   */
  private interval = 15;

  private inited = false;

  constructor(private swUpdate: SwUpdate,
              private snackBar: MatSnackBar,
              private ngZone: NgZone) {
  }

  initUpdateWatcher() {
    if (this.inited === true) {
      return;
    }
    this.inited = true;
    this.swUpdate.available.subscribe(
      event => {
        console.log(event);
        this.ngZone.run(() => {
          console.log('update');
          const snackBarRef = this.snackBar.open('Alkalmazásból új verzió jelent meg, a helyes mükődéshez frissítsen!', 'frissítés');
          snackBarRef.onAction().subscribe(
            () => window.location.reload()
          );
        });
      }
    );

    this.swUpdate.activated.subscribe(
      () => console.log('Activated SW')
    );

    this.startUpdateTimer(this.updateStart);
  }

  private startUpdateTimer(updateTimeInSecond: number) {
    console.log('start update timer');
    const cb = () => new TimerObservable(updateTimeInSecond * 1000).subscribe(() => this.checkForUpdate()
    );

    if (NgZone.isInAngularZone()) {
      this.ngZone.runOutsideAngular(cb);
    } else {
      cb();
    }
  }

  private checkForUpdate() {
    console.log('checkForUpdate');
    return this.swUpdate.checkForUpdate()
      .then(() => this.startUpdateTimer(this.interval))
      .catch(
        error => {
          console.error(error);
          this.startUpdateTimer(this.interval);
        }
      );
  }
}
