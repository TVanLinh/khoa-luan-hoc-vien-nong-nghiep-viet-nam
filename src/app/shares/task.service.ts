import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {MystorageService} from "./mystorage.service";

@Injectable()
export class TaskService {
  constructor(private http: Http) {

  }

  public get(url: string): Observable<any> {
    return this.http.get(url).map(data => {
      return JSON.parse(data['_body']);
    });
  }

  public postLogin(url, data: any): Observable<any> {
    return this.http.post(url, data).map(res => res.json());
  }

  public post(url, data: any): Observable<any> {
    // let token = MystorageService.getAcount()['token'];
    // let headers = new Headers({
    //   'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    //   'authorization': 'Basic ' + token
    // });
    // let options: RequestOptionsArgs = {headers: headers};
    return this.http.post(url, data).map(res => {
      console.log("res " + res);
      return res.json();
    });
  }
}
