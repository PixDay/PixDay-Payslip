import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import { getAuth, signOut } from "firebase/auth";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User | null | undefined>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          return of(null);
        }
      })
    );
  }

  // Return user data from a given user ID
  async getUser(id: string) {
    const doc = await this.afs.collection('users').doc(id).ref.get();
    return await doc.data();
  }

  // Create a new user with email and password
  async signUp(signUpParameters: User)
  {
    firebase.auth().createUserWithEmailAndPassword(signUpParameters.email, signUpParameters.password).then
    ((userCredential: any) => {
      const data: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        firstName: signUpParameters.firstName,
        lastName: signUpParameters.lastName,
        password: 'P4ssw0rd',
        role: 'user',
        picture: ''
      };
      return this.updateUserData(data);
    })
  }

  // Sign in with email and password
  async signIn(signInParameters: User)
  {
    firebase.auth().signInWithEmailAndPassword(signInParameters.email, signInParameters.password).then
    (async ( userCredential) => {
      let userId = (userCredential as any).user.uid;
      await this.getUser(userId);
      return userCredential;
    })
  }
  
  private updateUserData(user: User)
  {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.id}`);

    const data: User = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: 'P4ssw0rd',
      role: user.role,
      picture: ''
    }
    return userRef.set(data, { merge : true });
  }
}
