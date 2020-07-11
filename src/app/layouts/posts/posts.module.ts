import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { FormsModule }            from '@angular/forms';

// Components
import { InlineSVGModule }        from 'ng-inline-svg';
import { HttpClientModule }       from '@angular/common/http';
import { FontAwesomeModule }      from '@fortawesome/angular-fontawesome';

// Modules
import { LayoutsModule }          from '../layouts.module';

// Services
import { PostService }            from './post.service';

// Components for sections of posts
import { DashboardComponent }     from './dashboard/dashboard.component';
import { DetailComponent }        from './detail/detail.component';
import { NavbarComponent }        from './navbar/navbar.component';
import { CreateComponent }        from './create/create.component';

const routes: Routes = [
  { path: 'portfolio/:id',           component: DetailComponent },
  { path: 'dashboard',               component: DashboardComponent },
  { path: 'dashboard/create-post',   component: CreateComponent }
]


@NgModule({
  declarations: [
    DashboardComponent,
    DetailComponent,
    NavbarComponent,
    CreateComponent
  ],
  imports: [
    LayoutsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    InlineSVGModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [
    PostService
  ]
})
export class PostsModule { }
