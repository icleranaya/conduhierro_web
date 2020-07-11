import { Component, OnInit }  from '@angular/core';

// Services
import { AuthService }        from '../core/auth.service';

// Routers
import { Router }             from '@angular/router';
import { Location }           from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  
  public activeCreate     = false;
  public activeDashboard  = false;

  // Current URL
  private currentURL = '';

  // Sections of template
  private dashboard : string = "escritorio";
  private create    : string = "crear";

  // ======================================
  //              Constructor
  // ======================================
  constructor(
    public auth: AuthService,
    private router: Router,
    private location: Location
  ) {
    this.router.events.subscribe( (val) => {

      this.currentURL = this.location.path().split('/')[1];

      if( this.location.path().split('/').length > 2 )
      {
        if( this.create === this.location.path().split('/')[3] )
        {
          this.activeCreate     = !this.activeCreate;
          this.activeDashboard  = false;
        }
        else
        {
          this.activeCreate     = this.activeCreate || false;
          this.activeDashboard  = true;
        }
      }
      else
      {
        if( this.dashboard === this.location.path().split('/')[1] )
        {
          this.activeDashboard  = !this.activeDashboard;
          this.activeCreate     = false;
        }
        else
        {
          this.activeDashboard  = this.activeDashboard || false;
          this.activeCreate     = true;
        }
      }
    });
  }

  // ======================================
  //              Init
  // ======================================
  ngOnInit() {
  }

  get isPanelAdmin(): boolean {
    return this.currentURL === "escritorio";
  }
}
