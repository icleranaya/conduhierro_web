import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// FireBase for auth
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private user: User;
	public userEmail: string;

	// ======================================
	//              Constructor
	// ======================================
	constructor(public afAuth: AngularFireAuth, private router: Router) {
		this.afAuth.authState.subscribe((user) => {
			if (user) {
				this.user = user;
				localStorage.setItem('user', JSON.stringify(this.user));

				// const user = JSON.parse( localStorage.getItem('user') );
				// this.userEmail = user.email;
			} else {
				localStorage.setItem('user', null);
			}
		});
	}

	async login(email: string, password: string) {
		try {
			await this.afAuth.auth.signInWithEmailAndPassword(email, password);

			this.router.navigate([ '/escritorio' ]);
		} catch (e) {
			alert('Error!' + e.message);
		}
	}

	async logout() {
		await this.afAuth.auth.signOut();
		localStorage.removeItem('user');
		this.router.navigate([ '/home' ]);
	}

	//=========================================
	//            Consultants
	//=========================================
	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem('user'));
		return user !== null;
	}
}
