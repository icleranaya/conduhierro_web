import { Component, OnInit }  from '@angular/core';

// Routers
import {
  Router,
  ActivatedRoute }            from '@angular/router';

// Services
import { PostService }        from '../post.service';
import { AuthService }        from '../../core/auth.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html'
})
export class ReadComponent implements OnInit {

  // ======================================
  //              Post Variables
  // ======================================
  public title      : string;
  public content    : string;
  public excerpt    : string;
  public thumbnail  : string;
  public id         : string;
  public slider     : Array<string>;
  public isSlider   : boolean = false;
  public editBTN    : string = "Editar";
  public deleteBTN  : string = "Borrar";

  // ======================================
  //              Constructor
  // ======================================
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private postService: PostService
  ) {

    // Redirect if you are not logged in
    if( !this.auth.isLoggedIn ) {
      this.router.navigate(['/home']);
    }
  }

  // ======================================
  //              Init
  // ======================================
  ngOnInit() {
    // Get Data Post
    this.getPost();
  }

  //=========================================
  //            Consultants
  //=========================================
  getPost() {
    const id = this.route.snapshot.paramMap.get( 'id' );

    return this.postService
      .getPostData( id )
      .subscribe( data => {
        this.id         = data.id;
        this.title      = data.title;
        this.content    = data.content;
        this.excerpt    = data.excerpt;
        this.thumbnail  = data.image;

        for( let i = 0; i < data.slider.length; i++)
        {
          if( data.slider[i] )
            this.isSlider = true;
          else
            this.isSlider = false;
        }

        if( this.isSlider )
          this.slider     = data.slider;
      });
  }

  //=========================================
  //            Modifiers
  //=========================================
  setUpdate() {
    const id = this.route.snapshot.paramMap.get( 'id' );
    this.router.navigate(["/escritorio/entrada/editar/" + id]);
  }

  setDelete() {
    const id = this.route.snapshot.paramMap.get( 'id' );
    this.postService.setDelete( id );
    this.router.navigate(["/escritorio"]);
  }
}
