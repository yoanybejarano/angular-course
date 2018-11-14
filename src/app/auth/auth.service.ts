import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;

  constructor(private router: Router) {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then((tokenResult) => {
                this.token = tokenResult;
              }
            );
        })
      .catch(error => console.log(error));
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((tokenResult: string) => {
        this.token = tokenResult;
      });
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut().catch(error => console.log(error));
    this.token = null;
  }

}
