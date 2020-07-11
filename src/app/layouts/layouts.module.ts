import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Components
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Swiper Slider
import {
	SwiperModule,
	SWIPER_CONFIG,
	SwiperConfigInterface,
	SwiperBreakpointsInterface,
	SwiperAutoplayInterface
} from 'ngx-swiper-wrapper';

// Swiper default configuration
const autoplay: SwiperAutoplayInterface = {
	delay: 2000
};

const breakpoints: SwiperBreakpointsInterface = {
	600: {
		direction: 'horizontal',
		slidesPerView: 1
	}
};

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
	loop: true,
	speed: 1000,
	autoplay: false,
	autoHeight: true,
	navigation: false,
	direction: 'vertical',
	watchSlidesProgress: true,
	mousewheel: {
		invert: false
	},
	breakpoints: breakpoints,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	}
};

// Components for Secctions
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { WeAreComponent } from './we-are/we-are.component';
import { WeDoComponent } from './we-do/we-do.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from '../newone/auth/auth.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
	{
		path: 'servicios',
		component: ServicesComponent,
		data: { animation: 'Servicios' }
	},
	{
		path: 'nosotros',
		component: WeAreComponent,
		data: { animation: 'Nosotros' }
	},
	{
		path: 'lo-que-hacemos',
		component: WeDoComponent,
		data: { animation: 'Hacemos' }
	},
	{
		path: 'portafolio',
		component: PortfolioComponent,
		data: { animation: 'Portafolio' }
	},
	{
		path: 'portafolio/ver/:id',
		component: ProductComponent,
		data: { animation: 'Producto' }
	},
	{
		path: 'contacto',
		component: ContactComponent,
		data: { animation: 'Contacto' }
	},
	{
		path: 'cdh-admin',
		component: AuthComponent,
		data: { animation: 'Login' }
	}
];

@NgModule({
	declarations: [
		MenuComponent,
		HomeComponent,
		ServicesComponent,
		PortfolioComponent,
		WeAreComponent,
		WeDoComponent,
		ContactComponent,
		FooterComponent,
		AuthComponent,
		ProductComponent
	],
	imports: [
		CommonModule,
		SwiperModule,
		HttpClientModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		InlineSVGModule.forRoot(),
		RouterModule.forRoot(routes)
	],
	exports: [ CommonModule, MenuComponent, FooterComponent ],
	providers: [
		{
			provide: SWIPER_CONFIG,
			useValue: DEFAULT_SWIPER_CONFIG
		}
	]
})
export class LayoutsModule {}
