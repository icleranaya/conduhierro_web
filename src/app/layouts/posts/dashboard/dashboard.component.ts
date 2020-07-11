import { Component, OnInit }  from '@angular/core';
import { AuthService }        from '../../../core/auth.service';

// Observables
import { Observable }         from 'rxjs';

// Class Posts
import { Post }               from '../post';
import { PostService }        from '../post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(
    private auth: AuthService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
  }

}
