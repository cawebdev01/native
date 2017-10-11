import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, ToastController, } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData; 
  userData = {email:'', password: '', lang: 'en', NEWMOBILE: '1'};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl : LoadingController,
    private loading : Loading,
    private toastCtrl : ToastController,
    private loginservice : LoginServiceProvider,
    public alertCtrl : AlertController,
  ) { }
  public login(){
    this.showLoading();
    this.loginservice.login(this.userData).then((result)=>{
      this.loading.dismiss();
      this.loginData = result;
      if(this.loginData.status.err_code == 0){
        localStorage.setItem('sessionid', this.loginData.sessionid);
        localStorage.setItem('url', this.loginData.url);
        localStorage.setItem('email', this.loginData.resources.mailAdress);
        localStorage.setItem('password', this.userData.password);
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
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
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
