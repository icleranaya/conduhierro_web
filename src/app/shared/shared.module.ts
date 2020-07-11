import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { InlineSVGModule } from 'ng-inline-svg';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Comonents
import { SidebarComponent } from '../newone/sidebar/sidebar.component';
import { DashboardComponent } from '../newone/dashboard/dashboard.component';
import { ReadComponent } from '../newone/posts/read/read.component';
import { CreateComponent } from '../newone/posts/create/create.component';
import { UpdateComponent } from '../newone/posts/update/update.component';
import { TopbarComponent } from '../newone/topbar/topbar.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: 'escritorio',
		component: DashboardComponent,
		data: { animation: 'Escritorio' }
	},
	{
		path: 'escritorio/entrada/crear',
		component: CreateComponent,
		data: { animation: 'Crear' }
	},
	{
		path: 'escritorio/entrada/ver/:id',
		component: ReadComponent,
		data: { animation: 'Ver' }
	},
	{
		path: 'escritorio/entrada/editar/:id',
		component: UpdateComponent,
		data: { animation: 'Editar' }
	}
];

@NgModule({
	imports: [
		CommonModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		InlineSVGModule.forRoot(),
		RouterModule.forChild(routes)
	],
	exports: [
		CommonModule,
		TopbarComponent,
		SidebarComponent,
		InlineSVGModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [ SidebarComponent, TopbarComponent ]
})
export class SharedModule {}
