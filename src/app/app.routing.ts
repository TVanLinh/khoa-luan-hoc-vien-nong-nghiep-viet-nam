import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {PersonnelManagerComponent} from "./personnels/personnels.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {CurriculumVitaeComponent} from "./personnels/info-person/curriculum-vitae/curriculum-vitae.component";

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {

}
