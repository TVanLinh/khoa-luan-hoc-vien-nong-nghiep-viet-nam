import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {ManagerComponent} from "./personnels/manger.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'manager',
    // component: ManagerComponent
    loadChildren: 'app/personnels/pesonnel.module#PesonnelModule'
  },
  {path: '**', redirectTo: '/'}

];


export const AppRouting = RouterModule.forRoot(routes);
