import { Component, OnInit }        from '@angular/core';

// FontAwesome
import { faInstagram, faWhatsapp }  from '@fortawesome/free-brands-svg-icons';
import { faPhone }                  from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

    faInstagram = faInstagram;
    faWhatsapp = faWhatsapp;
    faPhone = faPhone;

    constructor() { }

    ngOnInit() {
    }

}
