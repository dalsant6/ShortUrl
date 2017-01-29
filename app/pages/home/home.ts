import {Component, OnInit} from '@angular/core';
import {PageContentComponent} from "../../shared/components/layout/page-content/page-content";
import {RowComponent} from "../../shared/components/layout/row/row";
import {ColComponent} from "../../shared/components/layout/col/col";
import {ControlGroup, FormBuilder, Control} from "@angular/common";
import {DataService} from "../../services/data.service";
import {SelectItem, SelectButton, Button, InputText} from "primeng/primeng";
import {EarlyAccess} from "../../shared/models/earlyaccess";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.css'],
  directives: [ColComponent, RowComponent, PageContentComponent, SelectButton, Button, InputText]
})
export class HomeComponent implements OnInit{
  emailForm: ControlGroup;
  type: string = 'Client';
  registeredEA: EarlyAccess;


  constructor(private _fb: FormBuilder, private _dataService: DataService){
    this.emailForm = _fb.group({
      email: ['']
    });

  }
  ngOnInit(){

  }
  register(data: any){
    if(data.email){
      let email = data.email;
      this._dataService.registerEarlyAccess(data.email, this.type).subscribe((result) => {
        console.log('notified!');
        this.registeredEA = new EarlyAccess(result);
        this.type = 'Client';
        (<Control>this.emailForm.find('email')).updateValue('');
      });
    }
  }
}
