import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-route404',
  templateUrl: './route404.component.html'
})
export class Route404Component implements AfterViewInit {
  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    new TimerObservable(5000).subscribe(
      () => this.router.navigate(['/chat'])
    );
  }
}
