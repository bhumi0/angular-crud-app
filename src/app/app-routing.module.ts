import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DisplayComponent } from './display/display.component';
import { AdmViewComponent } from './adm-view/adm-view.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login',component:LoginPageComponent},
  { path: 'display', component: DisplayComponent, canActivate:[AuthGuard]},
  { path: 'adm', component: AdmViewComponent, canActivate:[AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { 
}
