import { Component, OnInit }  from '@angular/core';

// Services
import { AuthService }        from '../../../core/auth.service';
import { PostService }        from '../post.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  title       : string;
  image       : string = null;
  content     : string;
  excerpt     : string = null;
  buttonText  : string = "Publicar";

  constructor( private auth: AuthService, private postService: PostService ) { }

  ngOnInit() {
  }

  createPost() {
    const data = {
      title     : this.title,
      image     : this.image,
      content   : this.content,
      excerpt   : this.excerpt,
      published : new Date()
    };

    this.postService.setCreate( data );
    this.title = '';
    this.content = '';
    this.buttonText = 'Entrada Publicada';
    setTimeout( () => this.buttonText =  "Publicar", 3000);
  }
}
