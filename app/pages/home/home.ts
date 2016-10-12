import {Component, OnInit} from '@angular/core';
import {PageContentComponent} from "../../shared/components/layout/page-content/page-content";
import {RowComponent} from "../../shared/components/layout/row/row";
import {ColComponent} from "../../shared/components/layout/col/col";
import {ControlGroup, FormBuilder} from "@angular/common";
import {DataService} from "../../services/data.service";
import {Url} from "../../shared/models/url";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.css'],
  directives: [ColComponent, RowComponent, PageContentComponent]
})
export class HomeComponent implements OnInit{
  urlForm: ControlGroup;
  analyzeForm: ControlGroup;
  url: Url;
  shortenedUrl: string = '';
  percentDecrease: string = '';
  baseUrl: string = 'cer.li/';

  constructor(private _fb: FormBuilder, private _dataService: DataService){
    this.urlForm = _fb.group({
      url: ['']
    });
    this.analyzeForm = _fb.group({
      analyzeUrl: ['']
    });
  }
  ngOnInit(){

  }
  submitUrl(url: string){
    this._dataService.submitUrl(url).subscribe((data) => {
      this.url = new Url(data);
      this.percentDecrease = Math.floor(((this.urlForm.find('url').value.length - this.url.shortUrl.length)/this.urlForm.find('url').value.length)*100).toString();
    });
  }
  analyzeUrl(url: string){
    url = this.strip(url);
    console.log('analyzing '+url);
    let appended = url.substr(url.indexOf("/")+1);
    console.log('appended = '+appended);
  }
  strip(url: string){ //strip the input field of anything but the url
    url = url.substr(url.indexOf("cer.li/")); //remove the prefix
    let append = url.substr(url.indexOf("/")+1);
    if(append.indexOf("/") >= 0){
      append = append.substr(0, append.indexOf("/"));
    }
    if(append.length > 5){
      append = append.substr(0,5);
    }
    url = url.substr(0, url.indexOf("/")+1)+append;
    return url;
  }
}
