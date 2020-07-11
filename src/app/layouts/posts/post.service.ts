import { Injectable }   from '@angular/core';

// rxjs
import { Observable }   from 'rxjs';
import { map }          from 'rxjs/operators';

// firebase
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
}                       from '@angular/fire/firestore';

// Import class for posts
import { Post }         from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsCollection : AngularFirestoreCollection<Post>;
  postDoc         : AngularFirestoreDocument<Post>;

  constructor( private afs: AngularFirestore ) {
    this.postsCollection = this.afs.collection('posts', ref =>
      ref.orderBy('published', 'desc')
    );
  }

  //=========================================
  //            Consultants
  //=========================================

  getPosts() {
    return this.postsCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data  = a.payload.doc.data() as Post;
        const id    = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getPostData( id: string ) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }

  getPost( id: string ) {
    return this.afs.doc<Post>(`posts/${id}`);
  }

  //=========================================
  //            Modifiers
  //=========================================

  setCreate( data: Post ) {
    // this.afs.collection<Post>('posts').add( data );
    this.postsCollection.add( data );
  }

  setUpdate( id: string, formData ) {
    return this.getPost( id ).update( formData );
  }

  setDelete( id: string ) {
    return this.getPost( id ).delete();
  }
}
