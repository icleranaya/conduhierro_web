import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

// Forms
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
	authentication: FormGroup;

	constructor(public auth: AuthService) {}

	ngOnInit() {
		this.authentication = new FormGroup({
			email: new FormControl(null),
			password: new FormControl(null)
		});
	}

	onSubmit() {
		this.auth.login(this.authentication.get('email').value, this.authentication.get('password').value);
	}
}
