import {
  ActivatedRouteSnapshot, CanActivateChild, Router,
  RouterStateSnapshot
} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {MystorageService} from "../mystorage.service";
import {TaskService} from "../task.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ManagerCanactiveChild implements CanActivateChild {
  constructor(private  taskService: TaskService, private router: Router) {

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let acount = MystorageService.getAcount();
    let authen = false;
    let url = state.url;


    let username = acount['user']['username'];
    let frontends = [];
    for (let item of acount['user']['roles']) {
      for (let it of item['frontends']) {
        frontends.push(it);
      }
    }
    // console.log(url)
    console.log(url);
    for (let item of frontends) {
      // console.log(JSON.stringify(item));
      if (item['url'] == url || '/manager/info?user'.indexOf(item['url']) != -1) {
        return true;
      }
    }

    // if(url)

    this.router.navigate(["/"]);
    console.log(false);
    return false;
  }


}
