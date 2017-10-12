import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MailsServiceProvider } from '../../../providers/mails-service/mails-service';

@Component({
  selector: 'page-mailsingle',
  templateUrl: 'mailsingle.html',
})
export class MailsinglePage {
  title; msgid
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mailsservice: MailsServiceProvider,
  ) {
    this.title = "Mail details";
    this.msgid = navParams.get("msgid");
    this.openMail();
  }
  from; to; sub; date; text; attach;
  openMail(){
    this.mailsservice.getMail(this.msgid).subscribe(mail =>{
      this.from = mail.from.addr;
      this.to = mail.to.addr;
      this.sub = mail.subject;
      this.date = mail.date;
      this.text = mail.text;
      this.attach = mail.attach
    })
    this.mailsservice.markasRead(this.msgid);
  }
}
