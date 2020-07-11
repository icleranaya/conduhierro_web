import { Component, OnInit } from '@angular/core';

// Swiper Slider
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
	public config: SwiperConfigInterface = {
		loop: true,
		speed: 1000,
		autoHeight: true,
		keyboard: true,
		navigation: false,
		direction: 'vertical',
		watchSlidesProgress: true,
		mousewheel: {
			invert: false
		},
		breakpoints: {
			500: {
				direction: 'horizontal'
			}
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
	};

	constructor() {}

	ngOnInit() {}
}
