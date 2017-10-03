import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TaskService {
  constructor(private http: Http) {

  }

  public  get(url: string): Observable<any> {
    return this.http.get(url).map(data => {
      return data.json()
    });
  }

  public  post(url, data: any, requestOption?: RequestOptionsArgs): Observable<any> {
    return this.http.post(url, data).map(data => {
      return data.json();
    })
  }
}
