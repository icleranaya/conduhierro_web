import {
  Component,
  OnInit, 
  AfterViewInit,
  ElementRef}                   from '@angular/core';

// Posts Services 
import { PostService }          from '../../newone/posts/post.service';

// Post Class
import { Post }                 from '../../newone/posts/post';

// Observables
import { Observable }           from 'rxjs';

// Swiper Slider
declare var Swiper: any;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  // ======================================
  //              Swiper Variables
  // ======================================
  private swiperConfig = {
    autoplay: 3000,
    slidesPerView: 4,
    pagination: false,
    autoHeight: false,
    slidesPerColumn: 1,
    direction: 'horizontal',
    watchSlidesProgress: true,
    mousewheel: true,
    keyboard: {
      enabled: true,
    },
    breakpoints:{
      1280:{
        slidesPerView: 3, 
      },
      910:{
        slidesPerView: 2, 
      },
      768:{
        slidesPerView: 1, 
      }
    },
    navigation: {
      nextEl: '.btn-right',
      prevEl: '.btn-left',
    },
  };

  // ======================================
  //              Post Variables
  // ======================================
  public posts: Observable<Post[]>;
  public post = [];

  // ======================================
  //              Constructor
  // ======================================
  constructor(
    private postService: PostService,
    private elementRef: ElementRef
  ) {

    this.posts = this.postService.getPosts();

    this.posts.subscribe( (data) => {

      data.forEach((a) => {
        this.post.push(a);
      });

    });

    // console.log( this.post );
  }

  // ======================================
  //              Init
  // ======================================
  ngOnInit() {
  }

  // ======================================
  //              AfterViewInit
  // ======================================
  ngAfterViewInit() {
    var swiper = new Swiper(
      this.elementRef
      .nativeElement
      .querySelector( '.swiper-container' ), this.swiperConfig );

    this.posts.subscribe( (snapshot) => {
      
      snapshot.forEach( (a) => {
        let itemElment = this.elementRef
          .nativeElement
          .querySelector( '#item-' + a.id );

        swiper.appendSlide( itemElment );
      });
    });
  }
}
