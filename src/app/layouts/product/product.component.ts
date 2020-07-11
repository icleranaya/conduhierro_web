import {
  Component,
  OnInit,
  AfterViewInit, 
  ElementRef, 
  Output,
  Input,
  EventEmitter}               from '@angular/core';

// FontAwesome
import {
  faInstagram,
  faWhatsapp }                from '@fortawesome/free-brands-svg-icons';
import { faPhone }            from '@fortawesome/free-solid-svg-icons';

// Navigation
import {
  Router,
  NavigationEnd }             from '@angular/router';

// Routers
import { ActivatedRoute }     from '@angular/router';

// Services
import { PostService }        from '../../newone/posts/post.service';

// Swiper Slider
declare var Swiper: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, AfterViewInit {

  // ======================================
  //              FontAwesome
  // ======================================
  public faPhone       = faPhone;
  public faWhatsapp    = faWhatsapp;
  public faInstagram   = faInstagram;

  // ======================================
  //              Swiper Slider
  // ======================================
  public swiperConfig = {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    autoHeight: true,
    keyboard: true,
    navigation: false,
    direction: 'horizontal',
    watchSlidesProgress: true,
    mousewheel: {
      invert: false
    },
    breakpoints: {
      500: {
        direction: 'horizontal'
      }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  };

  public mySwiper;

  // ======================================
  //              Post Variables
  // ======================================
  public title          : string;
  public content        : string;
  public excerpt        : string;
  public thumbnail      : string;
  public slider         : Array<string>;
  public isSlider       : boolean = false;
  public existsNextPost : boolean = false;

  // ======================================
  //           NextPost Variables
  // ======================================
  public nextPostTitle      : string;
  public nextPostContent    : string;
  public nextPostExcerpt    : string;
  public nextPostThumbnail  : string;
  public nextPostId         : string;
  public nextPostSlider     : Array<string>;
  public mySubscription;

  // ======================================
  //              ModalContact
  // ======================================
  public open   : boolean = false;
  public active : boolean = false;

  @Input() init: boolean;
  @Output() opened = new EventEmitter<any>();

  // ======================================
  //              Constructor
  // ======================================
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private postService: PostService
  ) {

    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }

    this.mySubscription = this.router.events.subscribe( (e) => {
      if( e instanceof NavigationEnd ) {
        this.router.navigated = false;
      }
    });

  }

  // ======================================
  //              Init
  // ======================================
  ngOnInit() {
    // Get Data Post by ID
    this.getPost();

    // Get Data NextPost
    this.getNextPost();
  }

  //=========================================
  //            Consultants
  //=========================================
  getPost() {
    const id = this.route.snapshot.paramMap.get( 'id' );

    return this.postService
    .getPostData( id )
    .subscribe( data => {
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

  getNextPost() {

    // Get Id Post
    const id = this.route.snapshot.paramMap.get( 'id' );

    return this.postService
      .getNextPost( id )
      .subscribe( (a) => {
        return a.ref
        .get()
        .then( (snap) => {
          
          if( snap.exists ) {

            this.nextPostId         = snap.id;
            this.nextPostTitle      = snap.data().title;
            this.nextPostContent    = snap.data().content;
            this.nextPostExcerpt    = snap.data().excerpt;
            this.nextPostThumbnail  = snap.data().image;

          }
          
          this.existsNextPost = snap.exists;
        });
      });
  }

  //=========================================
  //            Swiper SlideTo
  //=========================================
  onSlideTo( index ) {

    this.mySwiper.slideTo( index );
  }

  //=========================================
  //            Open Modal
  //=========================================
  onOpenModal() {
    this.active = !this.active;
    this.open   = !this.open;
    this.opened.emit();
  }

  //=========================================
  //            Close Modal
  //=========================================
  onCloseModal() {
    this.active = this.init || false;
    this.open   = this.init || false;
    this.opened.emit();
  }

  //=========================================
  //            AfterViewInit
  //=========================================
  ngAfterViewInit() {
    // Get Id Post
    const id = this.route.snapshot.paramMap.get( 'id' );

    // Swiper Instantiation
    this.mySwiper = new Swiper(
      this.elementRef
      .nativeElement
      .querySelector( '.swiper-container' ), this.swiperConfig );

    
    // Append Slides in Swiper
    this.postService
      .getPostData( id )
      .subscribe( data => {
        this.title      = data.title;
        this.content    = data.content;
        this.excerpt    = data.excerpt;
        this.thumbnail  = data.image;

        for( let i = 0; i < data.slider.length + 1; i++)
        {
          let gallery = this.elementRef
          .nativeElement
          .querySelector( '#gallery-' + i );

          this.mySwiper.appendSlide( gallery );
        }
      });
  }

  //=========================================
  //            Destroy
  //=========================================
  ngOnDestroy() {
    if( this.mySubscription ) {
      this.mySubscription.unsubscribe();
    }
  }

}
