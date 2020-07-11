import { Injectable } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

// Import class for posts
import { Post } from './post';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	tempPost: Observable<Post>;

	private postsCollection: AngularFirestoreCollection<Post>;
	private postDoc: AngularFirestoreDocument<Post>;

	// ======================================
	//              Constructor
	// ======================================
	constructor(private afs: AngularFirestore) {
		this.postsCollection = this.afs.collection('posts', (ref) => ref.orderBy('published', 'desc'));
	}

	//=========================================
	//            Consultants
	//=========================================
	getPosts() {
		return this.postsCollection.snapshotChanges().pipe(
			map((actions) =>
				actions.map((a) => {
					const data = a.payload.doc.data() as Post;
					const id = a.payload.doc.id;
					return { id, ...data };
				})
			)
		);
	}

	getPostData(id: string) {
		return this.afs.doc<Post>(`posts/${id}`).valueChanges();
	}

	getPost(id: string) {
		return this.afs.doc<Post>(`posts/${id}`);
	}

	getNextPost(id: string) {
		return this.getPost(id)
			.snapshotChanges()
			.pipe(
				map((actions) => {
					const data = actions.payload.data() as Post;
					const id = actions.payload.id;
					return { id, ...data };
				})
			)
			.pipe(
				map((actions) => {
					return this.getPost(actions.nextpost);
				})
			);
	}

	//=========================================
	//            Modifiers
	//=========================================
	setCreate(data: Post) {
		this.afs.collection('posts').ref.get().then((snapshot) => {
			var newID;

			if (snapshot.docs.length === 0) {
				data.prevpost = null;
				data.nextpost = null;
				newID = snapshot.docs.length + 1;
			} else {
				newID = parseInt(snapshot.docs.pop().id) + 1;

				data.nextpost = null;
				data.prevpost = snapshot.docs.pop().id;

				snapshot.docs.pop().ref.update({
					nextpost: newID.toString()
				});
			}

			this.postsCollection.doc(`${newID}`).set(data);
		});
	}

	setUpdate(id: string, formData) {
		return this.getPost(id).update(formData);
	}

	setDelete(id: string) {
		this.tempPost = this.getPost(id).snapshotChanges().pipe(
			map((actions) => {
				const data = actions.payload.data() as Post;
				const id = actions.payload.id;
				return { id, ...data };
			})
		);

		this.tempPost.subscribe((snapshot) => {
			const editNextPost = snapshot.nextpost;
			const editPrevPost = snapshot.prevpost;

			if (snapshot.prevpost) {
				this.getPost(editPrevPost).update({
					nextpost: editNextPost
				});
			}

			if (snapshot.nextpost) {
				this.getPost(editNextPost).update({
					prevpost: editPrevPost
				});
			}
		});

		return this.getPost(id).delete();
	}
}
