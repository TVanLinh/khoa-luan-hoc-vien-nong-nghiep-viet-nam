import {Subject} from "rxjs/Subject";

export class RoleServie {
  private menuRight = new Subject();
  menuRightShare = this.menuRight.asObservable();

  private menuLeft = new Subject();
  menuLeftShare = this.menuLeft.asObservable();


  menuRightPublish() {
    return this.menuRight.next(true);
  }

  menuLeftPublish() {
    return this.menuRight.next(true);
  }
}
