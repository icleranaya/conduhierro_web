import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output, 
  HostListener,
  ElementRef}                 from '@angular/core';

// Router
import { Router }             from '@angular/router';
import { Location }           from '@angular/common';

// Services
import { AuthService }        from '../core/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {

  userEmail : string;

  public open = false;
  public active = false;

  // Current URL
  private currentURL = '';

  public activeCreate = false;
  public activeEdit = false; 
  public activeView = false;
  public activeDashboard = true;

  // Sections of template
  private dashboard: string = "escritorio";
 

  @Input() init: boolean;
  @Output() opened = new EventEmitter<any>();

  // ======================================
  //              Constructor
  // ======================================
  constructor(
    public auth: AuthService,
    private _elementRef : ElementRef,
    private router: Router,
    private location: Location
  ) {
    this.router.events.subscribe( (val) => {

      this.currentURL = this.location.path().split('/')[1];
      
      this.userEmail = this.auth.userEmail;

        if (this.location.path().split('/').length > 2) {

            switch (this.location.path().split('/')[3]) {
                case "crear":
                    this.activeCreate = true;
                    this.activeDashboard = false;
                    break;
            
                case "editar":
                    this.activeEdit = true;
                    this.activeDashboard = false;
                    break;

                case "ver":
                    this.activeView = true;
                    this.activeDashboard = false;
                    break;

                default: 
                    this.activeCreate = false;
                    this.activeEdit = false;
                    this.activeView = false;
                    this.activeDashboard = true;
                    break;
            }

        }
        else {
            if (this.dashboard === this.location.path().split('/')[1]){
                this.activeCreate = false;
                this.activeEdit = false;
                this.activeView = false;
            }
            else{
                this.activeCreate = false;
                this.activeEdit = false;
                this.activeView = false;
            }
        }
    });
  }

  // ======================================
  //              Init
  // ======================================
  ngOnInit() {
  }

  // ======================================
  //              Consultants
  // ======================================
  onBurgerClicked() {
    this.active = !this.active;
    this.open = !this.open;
    this.opened.emit();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.active = false;
      this.open = false;
      this.opened.emit();
    }
  }

  get isPanelAdmin(): boolean {
    return this.currentURL === "escritorio";
  }
}
