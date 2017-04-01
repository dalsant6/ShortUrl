import {Component, OnInit} from '@angular/core';
import {ControlGroup, FormBuilder, Control} from "@angular/common";
import {DataService} from "../../services/data.service";
import {SelectItem, SelectButton, Button, InputText} from "primeng/primeng";
import {EarlyAccess} from "../../shared/models/earlyaccess";
import {Angulartics2} from "angulartics2/index";
declare let google_report_conversion: Function;


@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.html',
  directives: [SelectButton, Button, InputText]
})
export class HomeComponent implements OnInit{
  emailForm: ControlGroup;
  type: string = 'Client';
  registeredEA: EarlyAccess;
  showEmailReq: boolean = false;
  showCompanyReq: boolean = false;
  showBadFormat: boolean = false;
  registerError: string = '';
  twitterPixel1: string = '';
  twitterPixel2: string = '';


  constructor(private _fb: FormBuilder, private _dataService: DataService, private angulartics2: Angulartics2){
    this.emailForm = _fb.group({
      email: [''],
      company: ['']
    });

  }
  ngOnInit(){

  }
  register(data: any){
    if(data.email && data.company){
      let email = data.email;
      let name = this.filterName(data.company);
      if(this.isEmailFormat(email)){
        if(name.length >= 4){
          this.showBadFormat = false;
          this.showEmailReq = false;
          this.showCompanyReq = false;
          this.angulartics2.eventTrack.next({action: "", properties : {category: "", label: ""}});
          this._dataService.registerEarlyAccess(email, name, this.type).subscribe((result) => {
            if (result.error) {
              let errorMsg:string = result.error;
              if (errorMsg == 'Format') {
                this.showError('Format');
                this.angulartics2.eventTrack.next({action: 'Register', properties: {category: 'Error', label: 'Format'}});
              } else if (errorMsg == 'Taken') {
                this.showError('Taken');
                this.angulartics2.eventTrack.next({action: 'Register', properties: {category: 'Error', label: 'Taken'}});
              } else {
                this.showError('Unknown');
                this.angulartics2.eventTrack.next({
                  action: 'Register',
                  properties: {category: 'Error', label: 'Unknown'}
                });
              }
            } else {
              this.registeredEA = new EarlyAccess(result);
              this.angulartics2.eventTrack.next({
                action: 'Register',
                properties: {category: 'Success', label: this.registeredEA.type}
              });
              this.twitterPixel1 = '<img height="1" width="1" style="display:none;" alt="" src="https://analytics.twitter.com/i/adsct?p_id=Twitter&p_user_id=0&txn_id=nx4cx&events=%5B%5B%22pageview%22%2Cnull%5D%5D&tw_sale_amount=1&tw_order_quantity=1" />';
              this.twitterPixel2 = '<img height="1" width="1" style="display:none;" alt="" src="//t.co/i/adsct?p_id=Twitter&p_user_id=0&txn_id=nx4cx&events=%5B%5B%22pageview%22%2Cnull%5D%5D&tw_sale_amount=1&tw_order_quantity=1" />';
              this.reset();
            }
          }, (error) => {
            this.showError('Unknown');
            this.angulartics2.eventTrack.next({action: 'Register', properties: {category: 'Error', label: 'Unknown'}});
          });
        }else{
          this.showError('NoCompany');
          this.angulartics2.eventTrack.next({action: "", properties : {category: "", label: ""}});
        }
      }else{
        this.showError('Format');
        this.angulartics2.eventTrack.next({action: "", properties : {category: "", label: ""}});
      }
    }else {
      if(!data.email){
        this.showError('NoEmail');
        this.angulartics2.eventTrack.next({action: "", properties: {category: "", label: ""}});
      }else{
        this.showError('NoCompany');
        this.angulartics2.eventTrack.next({action: "", properties: {category: "", label: ""}});
      }
    }
  }
  reset(){
    this.showBadFormat = false;
    this.showEmailReq = false;
    this.showCompanyReq = false;
    this.registerError = '';
    this.type = 'Client';
    (<Control>this.emailForm.find('email')).updateValue('');
    (<Control>this.emailForm.find('company')).updateValue('');
  }
  showError(err: string){
    this.showBadFormat = false;
    this.showEmailReq = false;
    this.showCompanyReq = false;
    this.registerError = '';
    this.registeredEA = null;
    switch (err){
      case 'NoCompany':
            this.showCompanyReq = true;
            break;
      case 'NoEmail':
            this.showEmailReq = true;
            break;
      case 'Taken':
            this.registerError = 'This email is already registered.';
            break;
      case 'Format':
            this.showBadFormat = true;
            break;
      case 'Unknown':
            this.registerError = 'We are receiving a large number of requests right now. Please try again later.';
            break;
      default:
        this.registerError = 'We are receiving a large number of requests right now. Please try again later.';
        break;
    }
  }
  isEmailFormat(email: string): boolean{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  filterName(name: string): string{
    let filtered = name.replace(/[^0-9a-zA-Z\s]/g,'');
    console.log('filtered: '+filtered);
    return filtered.trim();
  }
}
