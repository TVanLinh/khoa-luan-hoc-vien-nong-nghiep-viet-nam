import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {PersonnelRouting} from "./personnels/pesonnel.routing";

const routes: Routes = [
  // {
  //   path: '', redirectTo: '', pathMatch: 'full'
  // },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {path: '**', redirectTo: '/'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),PersonnelRouting],
  exports: [RouterModule]
})
export class AppRouting {

}
