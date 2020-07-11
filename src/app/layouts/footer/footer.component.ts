import { Component, OnInit }  from '@angular/core';

// FontAwesome
import { faInstagram }        from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  faInstagram = faInstagram;

  constructor() { }

  ngOnInit() {
  }

}
