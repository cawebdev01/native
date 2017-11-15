import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController,  ToastController, } from 'ionic-angular';
import { LoginService } from '../../providers/login-service/login-service';
import { HomePage } from '../home/home';
//import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData; loading;
  userData = {email:'', password: '', lang: '', NEWMOBILE: '1'};
  langs= [{id:'cz', value:'cz'}, {id:'en', value:'en'}, {id:'es',value:'es'}, {id:'fr',value:'fr'}, {id:'hu',value:'hu'}, {id:'it',value:'it'}, {id:'pl',value:'pl'}, {id:'sk',value:'sk'}]
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl : LoadingController,
    private toastCtrl : ToastController,
    private loginservice : LoginService,
    public alertCtrl : AlertController,
  ) {
    this.langs
   }
  public login(){
    this.showLoading();
    this.loginservice.login(this.userData).then((result)=>{
      this.loading.dismiss();
      this.loginData = result;
      if(this.loginData.status.err_code == 0){
        localStorage.setItem('sessionid', this.loginData.sessionid);
        localStorage.setItem('url', this.loginData.url);
        localStorage.setItem('email', this.loginData.resources.mailAddress);
        localStorage.setItem('password', this.userData.password);
        localStorage.setItem('lang', this.userData.lang)
        this.navCtrl.setRoot( HomePage )
      } else if(this.loginData.status.err_code == 1000 ){
        this.showError(this.loginData.status.err_txt)
      } else {
        this.showError("Acces Denied")
      }
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    })
  }
  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    setTimeout(()=> {
      this.loading.dismiss()
    }, 5000)
  }
  presentToast(msg){
    let toast =this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    })
    toast.onDidDismiss(() =>{
      console.log('Dismissed toast');
    })
    toast.present()
  }
  showError(text){
    this.loading.dismiss()
  }


}
