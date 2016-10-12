import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, Headers} from "@angular/http";

@Injectable()
export class BaseService {
  headers: Headers = new Headers();
  baseUrl = 'http://localhost:8080/example_war_exploded/rest';
  constructor(private http: Http){
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  get(path: string){
    return this.http.get(this.baseUrl+path).map(res => res.json());
  }
  post(path: string, obj: any){
    return this.http.post(this.baseUrl+path, JSON.stringify(obj), {headers: this.headers}).map(res => res.json());
  }
}
