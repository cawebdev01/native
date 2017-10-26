import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MailsServiceProvider } from '../../../providers/mails-service/mails-service';

@Component({
  selector: 'page-newmail',
  templateUrl: 'newmail.html',
})
export class NewmailPage {
  email= localStorage.getItem("email"); high: any;  notice: any; /*attach: any;*/
  message = {from: this.email, to:'', cc:'', bcc:'', subject:'', content:'', /*attach:this.attach,*/ high: this.high , notice: this.notice}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private mailsservice : MailsServiceProvider,
  ) {
  }
  send(){
    if(this.message.high == true){
      this.message.high = 1
    }else{
      this.message.high = 0
    }
    if(this.message.notice == true){
      this.message.notice = "ALL"
    }else{
      this.message.notice = ''
    }
    console.log(this.message)
    this.mailsservice.sendMail(this.message).then((result)=>{
      this.navCtrl.first()
    },(err)=>{
      console.log(err)
    })
  }

}
