import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { locale } from 'moment';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = LoginPage; lang
  sessionid: string = localStorage.getItem('sessionid');
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private translate: TranslateService) {
    this.testsession(this.sessionid);
    this.lang = localStorage.getItem('lang')
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      translate.addLangs(["cz", "en", "es", "fr", "hu", "it", "pl", "sk"])
      translate.setDefaultLang('fr')
      let browserLang = translate.getBrowserLang();
      translate.use(/*browserLang.match(/cz|en|es|fr|hu|it|pl|sk/) ? browserLang : */this.lang)
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  testsession(session){
     if(session != null || session != undefined ){this.rootPage = HomePage}
     else{ this.rootPage = LoginPage }
  }
}
