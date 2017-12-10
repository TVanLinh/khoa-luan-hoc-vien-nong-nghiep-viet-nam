import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {MystorageService} from "../mystorage.service";
import {Injectable} from "@angular/core";
import {TaskService} from "../task.service";
import {Config} from "../config";

@Injectable()
export class ManagerCanactive implements CanActivate {
  constructor(private router: Router, private  taskService: TaskService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let acount = MystorageService.getAcount();
    if (!acount) {
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }

}
