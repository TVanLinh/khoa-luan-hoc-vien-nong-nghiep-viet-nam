import {Subject} from "rxjs/Subject";

export class AcountShareService {
  private shareAvatar = new Subject();
  avatarLisener = this.shareAvatar.asObservable();

  private logout = new Subject();
  logoutListener = this.logout.asObservable();

  shareAvatarEvent(value) {
    this.shareAvatar.next(value);
  }

  logoutEvent() {
    this.logout.next(true);
  }
}
