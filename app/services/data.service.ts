import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from 'rxjs';
import {Http} from "@angular/http";

@Injectable()
export class DataService extends BaseService{

  constructor(http: Http){
    super(http);
  }
  registerEarlyAccess(email: string, type: string): Observable<any>{
    return Observable.create((observable: any) => {
      this.post("/registerEarlyAccess/", {email: email, type: type}).subscribe((data) => {
        observable.next(data);
      });
    });
  }
}
