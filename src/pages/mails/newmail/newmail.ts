import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { MailsServiceProvider } from '../../../providers/mails-service/mails-service';

@Component({
  selector: 'page-newmail',
  templateUrl: 'newmail.html',
})
export class NewmailPage {
  email= localStorage.getItem("email");
  message = {from: this.email, to:'', cc:'', cci:'', subject:'', content:'', attach:'', high:'', notice:''}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
   // private mailsservice : MailsServiceProvider,
  ) {
  }
  send(){
    /*this.mailsservice.sendMail(this.message).then((result)=>{

    })*/
    console.log("message envoyé"/*+ this.message*/)
  }

}
