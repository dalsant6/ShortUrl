import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteSegment} from '@angular/router';
import {DataService} from "../../services/data.service";
import {PageContentComponent} from "../../shared/components/layout/page-content/page-content";
import {Url} from "../../shared/models/url";

@Component({
  moduleId: module.id,
  selector: 'redirect',
  templateUrl: 'redirect.html',
  styleUrls: ['redirect.css'],
  directives: [PageContentComponent]
})

export class RedirectComponent {
  url: Url;
  constructor(private route: RouteSegment,private _dataService: DataService) {
    let shortUrl = route.getParam("id");
    this._dataService.getLongUrl(shortUrl).subscribe((data) => {
      this.url = new Url(data);
      _dataService.addRedirect(this.url.index.toString()).subscribe(() => {
        window.location.href = this.url.longUrl;
      });
    });
  }
}
