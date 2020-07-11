import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { PostService } from '../posts/post.service';

// Observables
import { Observable } from 'rxjs';

// Class Posts
import { Post } from '../posts/post';
import { AuthService } from '../core/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
	posts: Observable<Post[]>;

	// ======================================
	//              Constructor
	// ======================================
	constructor(private auth: AuthService, private postService: PostService, private router: Router) {
		// Redirect if you are not logged in
		if (!this.auth.isLoggedIn) {
			this.router.navigate([ '/home' ]);
		}
	}

	// ======================================
	//              Init
	// ======================================
	ngOnInit() {
		this.posts = this.postService.getPosts();
	}

	//=========================================
	//            Modifiers
	//=========================================
	setDelete(id: string) {
		this.postService.setDelete(id);
	}
}
