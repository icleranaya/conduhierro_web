import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output }                from '@angular/core';

// Location
import { Location }         from '@angular/common';

// Routers
import {
    Router,
    NavigationEnd }         from '@angular/router';

// FontAweso
import { faInstagram }      from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

    faInstagram = faInstagram;

    public open     = false;
    public white    = false;
    public product  = false;
    public active   = false;

    // Current URL
    private currentURL          = '';
    private currentProductURL   = '';

    // Sections of template
    private services    : string = "servicios";
    private contact     : string = "contacto";
    private productRute : string = "ver";

    @Input() init: boolean;
    @Output() opened = new EventEmitter<any>();

    // ======================================
    //              Constructor
    // ======================================
    constructor( private router: Router, private location: Location ) {
        this.router.events.subscribe( (val) => {

            this.currentURL = this.location.path().split('/')[1];

            this.active = this.init || false;
            this.open = this.init || false;
            
            switch (this.currentURL) {
                case this.services:
                        this.white = true;
                    break;
                
                case this.contact:
                    this.white = true;
                break;
            
                default:
                        this.white = false;
                    break;
            }

            this.currentProductURL = this.location.path().split('/')[2];

            if( this.productRute === this.currentProductURL )
                this.product = true;
            else
                this.product = false;

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
        this.open   = !this.open;
        this.opened.emit();
    }

    onHiddenMenu() {
        this.active = this.init || false;
        this.open   = this.init || false;
        this.opened.emit();
    }

    get isFrontPage(): boolean {
        return this.currentURL !== "escritorio";
    }
}
