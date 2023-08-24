import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const HOST_APP_ROUTES: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
];

export const REDIRECT_ROUTES: Routes = [{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(HOST_APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
