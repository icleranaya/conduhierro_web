import { Component, OnInit }  from '@angular/core';

// Routers
import { ActivatedRoute }     from '@angular/router';

// Services
import { PostService }        from '../post.service';

// Class Post
import { Post }               from '../post';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get( 'id' );
    return this.postService.getPostData( id ).subscribe( data => this.post = data );
  }

}
