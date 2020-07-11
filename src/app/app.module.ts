import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';

// Tansitions
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { HttpClientModule } from '@angular/common/http';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/shared.module';

// FireBase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// Module for NewOne
import { NewoneModule } from './newone/newone.module';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireStorageModule,
		AngularFireAuthModule,
		LayoutsModule,
		NewoneModule,
		SharedModule
	],
	providers: [ DatePipe ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
