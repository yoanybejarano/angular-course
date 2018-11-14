import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDWnPtb88BgTO8ioW8bRpzZoasAb8WdYRc',
      authDomain: 'ng-recipe-book-6c4f5.firebaseapp.com',
      databaseURL: 'https://ng-recipe-book-6c4f5.firebaseio.com',
      projectId: 'ng-recipe-book-6c4f5',
      storageBucket: 'ng-recipe-book-6c4f5.appspot.com',
      messagingSenderId: '505009840534'
    };
    firebase.initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain
    });
  }


}
