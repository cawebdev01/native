import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any 
  sessionid: string = localStorage.getItem('sessionid');
 
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.testsession();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  testsession(){
     if(this.sessionid != null || this.sessionid != undefined ){this.rootPage = HomePage}
     else{ this.rootPage = LoginPage }
  }
}

