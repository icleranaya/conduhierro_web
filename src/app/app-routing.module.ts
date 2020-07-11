import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Sections of App
import { HomeComponent } from './layouts/home/home.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{
		path: 'home',
		component: HomeComponent,
		data: { animation: 'Home' }
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
