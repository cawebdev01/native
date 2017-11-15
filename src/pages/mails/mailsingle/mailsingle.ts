import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MailsServiceProvider } from '../../../providers/mails-service/mails-service';

@Component({
  selector: 'page-mailsingle',
  templateUrl: 'mailsingle.html',
})
export class MailsinglePage {
  title; msgid; folderid
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mailsservice: MailsServiceProvider,
  ) {
    this.title = "Mail details";
    this.msgid = navParams.get("msgid");
    this.folderid = navParams.get("folderid");
    this.openMail();
  }
  from; to; cc; bcc; sub; date; text; attach; global
  openMail(){
    this.mailsservice.getMail(this.msgid, this.folderid).subscribe(mail =>{
      this.global = mail
      this.from = mail.from.addr;
      this.to = mail.to;
      this.cc = mail.cc;
      this.bcc = mail.bcc;
      this.sub = mail.subject;
      this.date = mail.date;
      this.text = mail.text;
      this.attach = mail.attach
    })
    this.mailsservice.markasRead(this.msgid);
  }
  msganswer(){
    console.log("message répondu")
  }
  msgfoward(){
    console.log("msg transféré")
  
  }
  msgdelete(){
    console.log("msg supprimé")

  }
}
