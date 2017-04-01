import {Component, ViewEncapsulation, ViewContainerRef} from '@angular/core';
import {HomeComponent} from "../../pages/home/home";
import {Angulartics2GoogleAnalytics} from "angulartics2/src/providers/angulartics2-google-analytics";
import {Angulartics2} from "angulartics2/index";
@Component({
	moduleId: module.id,
    selector: 'sd-app',
    templateUrl: 'base.html',
    encapsulation: ViewEncapsulation.None,
    directives: [HomeComponent],
    providers: [Angulartics2GoogleAnalytics]
})

export class AppComponent {
	viewContainerRef: any = null;
	public constructor(viewContainerRef:ViewContainerRef, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
	    // You need this small hack in order to catch application root view container ref
	    this.viewContainerRef = viewContainerRef;
	}
}
