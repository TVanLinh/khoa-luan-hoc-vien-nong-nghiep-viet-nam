import {
  ActivatedRouteSnapshot, CanActivateChild, Router,
  RouterStateSnapshot
} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {MystorageService} from "../mystorage.service";
import {TaskService} from "../task.service";
import {Injectable} from "@angular/core";
import {Config} from "../config";
import {noUndefined} from "@angular/compiler/src/util";

@Injectable()
export class ManagerCanactiveChild implements CanActivateChild {
  constructor(private  taskService: TaskService, private router: Router) {

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let acount = MystorageService.getAcount();
    let authen = false;


    let username = acount['user']['username'];

    console.log("ManagerCanactiveChild " + state.url + "  " + username);

    let url = state.url;

    this.taskService.get(Config.USER_URL + "/hashfrontend?username=" + username + "&url=" + url).subscribe(data => {
      authen = data;
      if (authen) {
        this.router.navigate([url]);
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }, error2 => {
      this.router.navigate(['/']);
    }, () => {

    });
    return true;
  }


}
