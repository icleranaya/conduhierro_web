import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { DatePipe }           from '@angular/common';

// Services
import { AuthService }        from '../../core/auth.service';
import { PostService }        from '../post.service';

// Observable
import { Observable }         from 'rxjs';
import { finalize }           from 'rxjs/operators';

// FireBase
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {

  // Quill Editor
  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
      ['clean'],                                        // remove formatting button
      ['link']                                          // link and image, video
    ]
  };
  
  // ======================================
  //              Post Variables
  // ======================================
  private title         : string;
  private content       : string;
  private image         : string = null;
  private excerpt       : string = null;
  private nextpost      : string = null;
  private prevpost      : string = null;
  
  // Images For slider Post
  private slider        : Array<string>;
  private sliderOne     : string = null;
  private sliderTwo     : string = null;
  private sliderThree   : string = null;
  private sliderFour    : string = null;

  // Btns
  private publishedBTN  : string = "Publicar";
  private saveBTN       : string = "Guardar";

  // Load Image
  private uploadPercent : Observable<number>;
  private imageURL      : Observable<string | null>;

  // ======================================
  //              Constructor
  // ======================================
  constructor(
    private router: Router,
    private auth: AuthService,
    private datePipe: DatePipe,
    private postService: PostService,
    private storage: AngularFireStorage
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
  }

  // ======================================
  //              CreatePost
  // ======================================
  createPost() {

    const date = this.datePipe.transform( new Date(), "d, MMM, y, h:mm a" );

    // Slider for post
    this.slider   = [
      this.sliderOne,
      this.sliderTwo,
      this.sliderThree,
      this.sliderFour
    ];

    const data = {
      title     : this.title,
      image     : this.image,
      content   : this.content,
      excerpt   : this.excerpt,
      published : date,
      slider    : this.slider,
      state     : "PUBLISHED",
      nextpost  : this.nextpost,
      prevpost  : this.prevpost,
    };

    this.postService.setCreate( data );

    this.title = "";
    this.content = "";
    this.publishedBTN = 'Entrada Publicada';
    setTimeout( () => this.publishedBTN =  "Publicar", 3000);

    this.router.navigate(["/escritorio"]);
  }

  // ======================================
  //              SavePost
  // ======================================
  savePost() {

    const date = this.datePipe.transform( new Date(), "MMM d, y, h:mm:ss a" );

    // Slider for post
    this.slider   = [
      this.sliderOne,
      this.sliderTwo,
      this.sliderThree,
      this.sliderFour
    ];

    const data = {
      title     : this.title,
      image     : this.image,
      content   : this.content,
      excerpt   : this.excerpt,
      published : date,
      slider    : this.slider,
      state     : "DRAFT",
      nextpost  : this.nextpost,
      prevpost  : this.prevpost,
    };

    this.postService.setCreate( data );

    this.title = "";
    this.content = "";
    this.publishedBTN = 'Entrada Publicada';
    setTimeout( () => this.publishedBTN =  "Publicar", 3000);

    this.router.navigate(["/escritorio"]);
  }

  // ======================================
  //              Upload Image
  // ======================================
  uploadImage( event )
  {
    const file = event.target.files[0];
    
    if( file.type.split('/')[0] !== 'image' )
    {
      return alert( 'Solo se permiten imagenes' );
    }
    else
    {
      const path          = `posts/${file.name}`;
      const fileRef       = this.storage.ref( path );
      const task          = this.storage.upload( path, file );
      this.uploadPercent  = task.percentageChanges();

      task.snapshotChanges()
        .pipe(
          finalize(
            () => fileRef.getDownloadURL()
            .subscribe(
              url => this.image = url
            )
          )
        )
        .subscribe();
    }
  }

  // Upload Image One
  uploadSliderOne( event )
  {
    const file = event.target.files[0];
    
    if( file.type.split('/')[0] !== 'image' )
    {
      return alert( 'Solo se permiten imagenes' );
    }
    else
    {
      const path          = `posts/${file.name}`;
      const fileRef       = this.storage.ref( path );
      const task          = this.storage.upload( path, file );
      this.uploadPercent  = task.percentageChanges();

      task.snapshotChanges()
        .pipe(
          finalize(
            () => fileRef.getDownloadURL()
            .subscribe(
              url => this.sliderOne = url
            )
          )
        )
        .subscribe();
    }
  }

  // Upload Image Two
  uploadSliderTwo( event )
  {
    const file = event.target.files[0];
    
    if( file.type.split('/')[0] !== 'image' )
    {
      return alert( 'Solo se permiten imagenes' );
    }
    else
    {
      const path          = `posts/${file.name}`;
      const fileRef       = this.storage.ref( path );
      const task          = this.storage.upload( path, file );
      this.uploadPercent  = task.percentageChanges();

      task.snapshotChanges()
        .pipe(
          finalize(
            () => fileRef.getDownloadURL()
            .subscribe(
              url => this.sliderTwo = url
            )
          )
        )
        .subscribe();
    }
  }

  // Upload Image Three
  uploadSliderThree( event )
  {
    const file = event.target.files[0];
    
    if( file.type.split('/')[0] !== 'image' )
    {
      return alert( 'Solo se permiten imagenes' );
    }
    else
    {
      const path          = `posts/${file.name}`;
      const fileRef       = this.storage.ref( path );
      const task          = this.storage.upload( path, file );
      this.uploadPercent  = task.percentageChanges();

      task.snapshotChanges()
        .pipe(
          finalize(
            () => fileRef.getDownloadURL()
            .subscribe(
              url => this.sliderThree = url
            )
          )
        )
        .subscribe();
    }
  }

  // Upload Image Four
  uploadSliderFour( event )
  {
    const file = event.target.files[0];
    
    if( file.type.split('/')[0] !== 'image' )
    {
      return alert( 'Solo se permiten imagenes' );
    }
    else
    {
      const path          = `posts/${file.name}`;
      const fileRef       = this.storage.ref( path );
      const task          = this.storage.upload( path, file );
      this.uploadPercent  = task.percentageChanges();

      task.snapshotChanges()
        .pipe(
          finalize(
            () => fileRef.getDownloadURL()
            .subscribe(
              url => this.sliderFour = url
            )
          )
        )
        .subscribe();
    }
  }
}
