import { Component, ViewChild } from '@angular/core';

// Router
import { Router, RouterOutlet } from '@angular/router';

// Location
import { Location } from '@angular/common';

import { fader, slider } from './animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	animations: [ slider ]
})
export class AppComponent {
	// Boolean for class Sections
	public isDashboard: boolean = false;

	private currentURL = '';

	constructor(private router: Router, private location: Location) {
		this.router.events.subscribe((val) => {
			this.currentURL = this.location.path().split('/')[1];

			switch (this.currentURL) {
				case 'escritorio':
					this.isDashboard = !this.isDashboard;
					break;

				default:
					this.isDashboard = false;
					break;
			}
		});
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
	}
}
