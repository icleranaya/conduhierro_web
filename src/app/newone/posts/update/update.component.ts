import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

// Routers
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';

// Class Post
import { Post } from '../post';

// Observable
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

// FireBase
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
	selector: 'app-update',
	templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {
	// Quill Editor
	config = {
		toolbar: [
			[ 'bold', 'italic', 'underline', 'strike' ], // toggled buttons
			[ 'blockquote', 'code-block' ],
			[ { list: 'ordered' }, { list: 'bullet' } ],
			[ { script: 'sub' }, { script: 'super' } ], // superscript/subscript
			[ { indent: '-1' }, { indent: '+1' } ], // outdent/indent
			[ { size: [ 'small', false, 'large', 'huge' ] } ], // custom dropdown
			[ { header: [ 1, 2, 3, 4, 5, 6, false ] } ],
			[ { color: [] }, { background: [] } ], // dropdown with defaults from theme
			[ { align: [] } ],
			[ 'clean' ], // remove formatting button
			[ 'link' ] // link and image, video
		]
	};

	// ======================================
	//              Post Variables
	// ======================================
	public title: string;
	public content: string;
	public excerpt: string = null;
	public image: string = null;

	// Images For slider Post
	public slider: Array<string>;
	public sliderOne: string = null;
	public sliderTwo: string = null;
	public sliderThree: string = null;
	public sliderFour: string = null;
	public deleteBTN: string = 'Borrar';
	public updateBTN: string = 'Actualizar';

	// Load Image
	public uploadPercent: Observable<number>;
	public imageURL: Observable<string | null>;

	// ======================================
	//              Constructor
	// ======================================
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private auth: AuthService,
		private postService: PostService,
		private datePipe: DatePipe,
		private storage: AngularFireStorage
	) {
		// Redirect if you are not logged in
		if (!this.auth.isLoggedIn) {
			this.router.navigate([ '/home' ]);
		}
	}

	// ======================================
	//              Init
	// ======================================
	ngOnInit() {
		this.getPost();
	}

	//=========================================
	//            Consultants
	//=========================================
	getPost() {
		const id = this.route.snapshot.paramMap.get('id');
		return this.postService.getPostData(id).subscribe((data) => {
			this.title = data.title;
			this.content = data.content;
			this.excerpt = data.excerpt;
			this.image = data.image;
			this.sliderOne = data.slider[0];
			this.sliderTwo = data.slider[1];
			this.sliderThree = data.slider[2];
			this.sliderFour = data.slider[3];
		});
	}

	//=========================================
	//            Modifiers
	//=========================================
	setUpdatePost() {
		const date = this.datePipe.transform(new Date(), 'd, MMM, y, h:mm a');

		// Slider for post
		this.slider = [ this.sliderOne, this.sliderTwo, this.sliderThree, this.sliderFour ];

		const formData = {
			title: this.title,
			image: this.image,
			content: this.content,
			excerpt: this.excerpt,
			published: date,
			slider: this.slider
		};

		const id = this.route.snapshot.paramMap.get('id');
		this.postService.setUpdate(id, formData);
		this.updateBTN = 'Entrada actualizada';
		setTimeout(() => (this.updateBTN = 'Actualizar'), 3000);

		this.router.navigate([ '/escritorio/entrada/ver/' + id ]);
	}

	setDelete() {
		const id = this.route.snapshot.paramMap.get('id');
		this.postService.setDelete(id);
		this.router.navigate([ '/escritorio' ]);
	}

	// ======================================
	//              Upload Image
	// ======================================
	uploadImage(event) {
		const file = event.target.files[0];

		if (file.type.split('/')[0] !== 'image') {
			return alert('Solo se permiten imagenes');
		} else {
			const path = `posts/${file.name}`;
			const fileRef = this.storage.ref(path);
			const task = this.storage.upload(path, file);

			task
				.snapshotChanges()
				.pipe(finalize(() => fileRef.getDownloadURL().subscribe((url) => (this.image = url))))
				.subscribe();
		}
	}

	// Upload Image One
	uploadSliderOne(event) {
		const file = event.target.files[0];

		if (file.type.split('/')[0] !== 'image') {
			return alert('Solo se permiten imagenes');
		} else {
			const path = `posts/${file.name}`;
			const fileRef = this.storage.ref(path);
			const task = this.storage.upload(path, file);
			this.uploadPercent = task.percentageChanges();

			task
				.snapshotChanges()
				.pipe(finalize(() => fileRef.getDownloadURL().subscribe((url) => (this.sliderOne = url))))
				.subscribe();
		}
	}

	// Upload Image Two
	uploadSliderTwo(event) {
		const file = event.target.files[0];

		if (file.type.split('/')[0] !== 'image') {
			return alert('Solo se permiten imagenes');
		} else {
			const path = `posts/${file.name}`;
			const fileRef = this.storage.ref(path);
			const task = this.storage.upload(path, file);
			this.uploadPercent = task.percentageChanges();

			task
				.snapshotChanges()
				.pipe(finalize(() => fileRef.getDownloadURL().subscribe((url) => (this.sliderTwo = url))))
				.subscribe();
		}
	}

	// Upload Image Three
	uploadSliderThree(event) {
		const file = event.target.files[0];

		if (file.type.split('/')[0] !== 'image') {
			return alert('Solo se permiten imagenes');
		} else {
			const path = `posts/${file.name}`;
			const fileRef = this.storage.ref(path);
			const task = this.storage.upload(path, file);
			this.uploadPercent = task.percentageChanges();

			task
				.snapshotChanges()
				.pipe(finalize(() => fileRef.getDownloadURL().subscribe((url) => (this.sliderThree = url))))
				.subscribe();
		}
	}

	// Upload Image Four
	uploadSliderFour(event) {
		const file = event.target.files[0];

		if (file.type.split('/')[0] !== 'image') {
			return alert('Solo se permiten imagenes');
		} else {
			const path = `posts/${file.name}`;
			const fileRef = this.storage.ref(path);
			const task = this.storage.upload(path, file);
			this.uploadPercent = task.percentageChanges();

			task
				.snapshotChanges()
				.pipe(finalize(() => fileRef.getDownloadURL().subscribe((url) => (this.sliderFour = url))))
				.subscribe();
		}
	}
}
