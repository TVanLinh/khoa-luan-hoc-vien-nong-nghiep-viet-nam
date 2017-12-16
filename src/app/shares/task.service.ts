import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {MystorageService} from "./mystorage.service";

@Injectable()
export class TaskService {
  constructor(private http: Http) {

  }

  public get(url: string, notJson?: boolean): Observable<any> {
    let token = MystorageService.getAcount() ? MystorageService.getAcount()['token'] : '';
    let headers = new Headers({
      'authorization': 'Basic ' + token
    });

    let options: RequestOptionsArgs = {headers: headers};
    if (token) {
      return this.http.get(url, options).map(data => {
        // return data.json();
        return notJson == true ? data : data.json();
      });
    } else {
      return this.http.get(url).map(data => {
        return notJson == true? data : data.json();
      });
    }

  }

  public postLogin(url, data: any): Observable<any> {
    return this.http.post(url, data).map(res => res.json());
  }

  public post(url, data: any): Observable<any> {
    let token = MystorageService.getAcount() ? MystorageService.getAcount()['token'] : '';
    let headers = new Headers({
      'authorization': 'Basic ' + token
    });
    let options: RequestOptionsArgs = {headers: headers};
    if (token) {
      return this.http.post(url, data, options).map(res => {
        console.log("res " + res);
        return res;
      });
    } else {
      return this.http.post(url, data).map(res => {
        console.log("res " + res);
        return res;
      });
    }

  }

  public put(url, data: any): Observable<any> {
    let token = MystorageService.getAcount() ? MystorageService.getAcount()['token'] : '';
    let headers = new Headers({
      'authorization': 'Basic ' + token
    });
    let options: RequestOptionsArgs = {headers: headers};
    if (token) {
      return this.http.put(url, data, options).map(res => {
        console.log("res " + res);
        return res;
      });
    } else {
      return this.http.post(url, data).map(res => {
        console.log("res " + res);
        return res;
      });
    }

  }

  public delete(url, name?: any[], data?: any[]): Observable<any> {
    let token = MystorageService.getAcount() ? MystorageService.getAcount()['token'] : '';
    let headers = new Headers({
      'authorization': 'Basic ' + token
    });
    let options: RequestOptionsArgs = {headers: headers};

    var temp = "";

    if (name && data) {
      for (let i = 0; i < name.length; i++) {
        temp += name[i] + "=" + data[i] + "&";
      }
    }

    if (token) {
      return this.http.delete(url + "?" + temp, options).map(res => {
        console.log("res " + res);
        return res;
      });
    } else {
      return this.http.delete(url + "?" + temp).map(res => {
        console.log("res " + res);
        return res;
      });
    }

  }


  public delete2(url, data): Observable<any> {
    let token = MystorageService.getAcount() ? MystorageService.getAcount()['token'] : '';
    let headers = new Headers({
      'authorization': 'Basic ' + token
    });
    let options: RequestOptionsArgs = {headers: headers};

    var temp = "";

    options.body = data;

    if (token) {
      return this.http.delete(url + "?" + temp, options).map(res => {
        return res.json();
      });
    } else {
      return this.http.delete(url + "?" + temp).map(res => {
        return res.json();
      });
    }

  }
}
