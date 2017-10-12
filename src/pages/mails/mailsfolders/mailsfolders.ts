import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MailsServiceProvider } from '../../../providers/mails-service/mails-service';

import { MailsinglePage } from '../mailsingle/mailsingle'; 

@Component({
  selector: 'page-mailsfolders',
  templateUrl: 'mailsfolders.html',
})
export class MailsFolders {
  title: string; mails:[any]; pageinfo:{any}; impFolder:[any]; dataUnread:[any];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mailsservice: MailsServiceProvider,
  ) {
    this.title = "MailsFolder";
    this.loadMails()
    
  }
  public loadMails(){
    this.mailsservice.getMails().subscribe(mails =>{
      this.mails = mails.data;
      this.pageinfo = mails.pageInfo;
      this.impFolder = mails.importantFolders;
      this.dataUnread = mails.dataUnread;
    })
  }
  public loadMail(objectId){
    this.navCtrl.push(MailsinglePage, {"msgid" : objectId } )
  }
}
