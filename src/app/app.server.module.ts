import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {LoadingComponent} from './loading/loading/loading.component';
import {LoadingModule} from './loading/loading.module';

// material SSR fix
declare var global: any;
var window = typeof window === 'object' && window ? window : {};
var navigator = typeof navigator === 'object' && navigator ? navigator : {};
global['window'] = window;
global['navigator'] = navigator;

export const routes = [
  {path: 'loading', component: LoadingComponent}
];

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    RouterModule.forChild(routes),
    ServerModule,
    LoadingModule
    // ModuleMapLoaderModule // <-- *Important* to have lazy-loaded routes work
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
