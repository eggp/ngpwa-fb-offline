import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NgZone, Optional, PLATFORM_ID} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {ServiceWorkerModule, SwUpdate} from '@angular/service-worker';
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatSnackBar,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {isPlatformBrowser} from '@angular/common';
import {AppUpdateService} from './app-update.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Route404Component} from './route404/route404.component';

export class OptionalSwUpdate {
  constructor(@Optional() public swUpdate: SwUpdate) {
  }
}

export const appUpdateServiceFactory = (_PLATFORM_ID: string, optionalSwUpdate: OptionalSwUpdate, matSnackBar: MatSnackBar,
                                        ngZone: NgZone) => {
  if (isPlatformBrowser(_PLATFORM_ID)) {
    return new AppUpdateService(optionalSwUpdate.swUpdate, matSnackBar, ngZone);
  }
  return null;
};

@NgModule({
  declarations: [
    AppComponent,
    Route404Component
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'pwa-test'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],

    FlexLayoutModule,

    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  providers: [
    OptionalSwUpdate,
    {
      provide: AppUpdateService,
      useFactory: appUpdateServiceFactory,
      deps: [PLATFORM_ID, OptionalSwUpdate, MatSnackBar, NgZone]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
