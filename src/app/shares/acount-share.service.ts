import {Subject} from "rxjs/Subject";

export class AcountShareService {
  private shareAvatar = new Subject();
  avatarLisener = this.shareAvatar.asObservable();

  shareAvatarEvent(value) {
    this.shareAvatar.next(value);
  }

}
