import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = LoginPage;
  sessionid: string = localStorage.getItem('sessionid');
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.testsession(this.sessionid);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  testsession(session){
     if(session != null || session != undefined ){this.rootPage = HomePage}
     else{ this.rootPage = LoginPage }
  }
}
