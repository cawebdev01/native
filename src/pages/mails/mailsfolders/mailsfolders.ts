import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MailsServiceProvider } from '../../../providers/mails-service/mails-service';

import { MailsinglePage } from '../mailsingle/mailsingle'; 
import { NewmailPage } from '../newmail/newmail';

@Component({
  selector: 'page-mailsfolders',
  templateUrl: 'mailsfolders.html',
})
export class MailsFolders {
  title: string; mails:[any]; pageinfo:{any}; impFolder:[any]; dataUnread:[any]; oid; folderid; refresh;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mailsservice: MailsServiceProvider,
  ) {
    this.title = "MailsFolder";
    this.folderid = navParams.get("folderid")
    this.loadMails(this.folderid)
    this.refresh = setInterval(() =>{
			this.loadMails(this.folderid)
		}, 60000);
    
  }
  public loadMails(folderid){
    console.log(folderid);
    this.mailsservice.getMails(folderid).subscribe(mails =>{
      this.mails = mails.data;
      this.oid = mails.data.objectId;
      this.pageinfo = mails.pageInfo;
      this.impFolder = mails.importantFolders;
      this.dataUnread = mails.dataUnread;
    })
  }
  public loadMail(objectId, folder){
    this.navCtrl.push(MailsinglePage, {"msgid" : objectId, "folderid": folder} )
  }
  public createMail(){
    this.navCtrl.push(NewmailPage)
  }
}