import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

// Components
import { DashboardComponent }   from './dashboard/dashboard.component';

// Modules
import { InlineSVGModule }      from 'ng-inline-svg';
import { CoreModule }           from './core/core.module';
import { PostsModule }          from './posts/posts.module';
import { SharedModule }         from '../shared/shared.module';

// Pagination
import { NgxPaginationModule }  from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    PostsModule,
    CoreModule,
    SharedModule,
    NgxPaginationModule,
    InlineSVGModule.forRoot(),
  ],
})
export class NewoneModule { }
