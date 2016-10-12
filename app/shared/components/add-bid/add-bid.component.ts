import {Component, Input} from '@angular/core';
import {ControlGroup, FormBuilder} from '@angular/common';
import {CardComponent} from "../layout/card/card";
import {DataService} from "../../../services/data.service";
import {ColComponent} from "../layout/col/col";

@Component({
  moduleId: module.id,
  selector: 'add-bid',
  templateUrl: 'add-bid.component.html',
  styleUrls: ['add-bid.component.css'],
  directives: [CardComponent, ColComponent]
})

export class AddBidComponent{
  @Input('job') job: any;
  bidForm: ControlGroup;
  constructor(private _fb: FormBuilder, private _dataService: DataService){
    this.bidForm = _fb.group({
      parts: [''],
      shipping: [''],
      misc: [''],
      pickup: [false],
      days: [4],
      miscComments: [''],
      comments: ['']
    });
  }
  /*
  submitBid(data: any){
    let newBid = new Bid(data);
    newBid.dateSubmitted = new Date().getTime();
    newBid.contractorId = this._userService.getCurrentUser().uid;
    console.log('newBid = '+JSON.stringify(newBid));
    this._dataService.addBid(this.job.id, newBid).subscribe((error) => {
      if(error){
        console.error(error);
      }else{
        console.log("no error, added bid!");
      }
    });
  }*/
}
