import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import {HomeComponent} from "../../pages/home/home";
import {TopNavComponent} from "../../shared/topnav/topnav";
import {RedirectComponent} from "../../pages/redirect/redirect";
@Component({
	moduleId: module.id,
    selector: 'sd-app',
    templateUrl: 'base.html',
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES, TopNavComponent]
})

@Routes([
    { path: '', component: HomeComponent},
    { path: '/:id', component: RedirectComponent}
])

export class AppComponent {
	viewContainerRef: any = null;
	public constructor(viewContainerRef:ViewContainerRef) {
	    // You need this small hack in order to catch application root view container ref
	    this.viewContainerRef = viewContainerRef;
	}
}
