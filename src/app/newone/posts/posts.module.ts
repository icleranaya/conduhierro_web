import { NgModule } from '@angular/core';

// Modules
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

// Services
import { PostService } from './post.service';

// Components
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
	declarations: [ CreateComponent, ReadComponent, UpdateComponent ],
	imports: [
		SharedModule,
		QuillModule.forRoot({
			placeholder: 'Insertar texto aquí ...'
		}),
		HttpClientModule
	],
	providers: [ PostService ]
})
export class PostsModule {}
