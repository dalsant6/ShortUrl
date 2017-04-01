import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class DataService extends BaseService{

  constructor(http: Http){
    super(http);
  }
  registerEarlyAccess(email: string, name: string, type: string): Observable<any>{
    return Observable.create((observable: any) => {
      this.post("/registerEarlyAccess/", {email: email, company: name, type: type}).subscribe((data) => {
        observable.next(data);
      });
    });
  }
}
