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
  title: string; public mails:[any]; pageinfo:any; impFolder:[any]; dataUnread:[any]; oid; folderid; refresh; status; 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mailsservice: MailsServiceProvider,
  ) {
    this.folderid = navParams.get("folderid")
    this.title = navParams.get("title") 
    this.loadMails(this.folderid)
    this.refresh = setInterval(() =>{
			this.loadMails(this.folderid)
    }, 60000); 
  }
  public loadMails(folderid){
    //console.log(folderid);
    this.mailsservice.getMails(folderid).subscribe(mails =>{
      this.mails = mails.data;
      this.oid = mails.data.objectId;
      this.pageinfo = mails.pageInfo;
      this.impFolder = mails.importantFolders;
      this.dataUnread = mails.dataUnread;
      this.status = mails.status
    });
  
  }
  reload(){
    this.loadMails(this.folderid)
  }
  items; texts
  setItemsSearch(){
    this.items = this.mails
  }
  onInput(ev: any){
    this.setItemsSearch();
    //console.log(this.items);
    let val = ev.target.value;
    if(val && val.trim() !== ''){
      this.items = this.items.filter(function(item){
        return (item.subject.toLowerCase().includes(val.toLowerCase())
        + item.from.toLowerCase().includes(val.toLowerCase()) +
        item.label.toLowerCase().includes(val.toLowerCase()) 
        + item.text.toLowerCase().includes(val.toLowerCase()));
        
      })
      console.log(this.items)
    }
  }
  public loadMail(objectId, folder){
    this.navCtrl.push(MailsinglePage, {"msgid" : objectId, "folderid": folder} )
  }
  public createMail(){
    this.navCtrl.push(NewmailPage)
  }
}