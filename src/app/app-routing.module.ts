import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Route404Component} from './route404/route404.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'chat'},
  {path: 'chat', loadChildren: 'app/chat/chat.module#ChatModule'},
  {path: '**', component: Route404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
