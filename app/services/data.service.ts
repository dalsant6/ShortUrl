import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from 'rxjs';
import {Http} from "@angular/http";

@Injectable()
export class DataService extends BaseService{

  constructor(http: Http){
    super(http);
  }
  submitUrl(url: string): Observable<any>{
    return Observable.create((observable: any) => {
      this.post("/submitUrl/", url).subscribe((data) => {
        observable.next(data);
      });
    });
  }
  getLongUrl(short: string): Observable<any>{
    return Observable.create((observable: any) => {
      this.get("/getLong/"+short).subscribe((data) => {
        observable.next(data);
      });
    });
  }
  addRedirect(index: string): Observable<any>{
    return Observable.create((observable: any) => {
      this.get("/add-redirect/"+index).subscribe((data) => {
        observable.next(data);
      });
    });
  }
}
