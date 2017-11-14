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
  title: string; nxp; public mails:[any]; pageinfo:any; impFolder:[any]; dataUnread:[any]; oid; length; folderid; refresh; status; 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public mailsservice: MailsServiceProvider,
  ) {
    this.folderid = navParams.get("folderid")
    this.title = navParams.get("title") 
    this.loadMails(this.folderid)
    /*this.refresh = setInterval(() =>{
			this.loadMails(this.folderid)
    }, 360000); */
    
  }
  public loadMails(folderid){
    this.mailsservice.getMails(folderid).subscribe(mails =>{
      this.mails = mails.data;
      this.oid = mails.data.objectId;
      this.pageinfo = mails.pageInfo;
      this.nxp = mails.pageInfo.nextPage
      this.impFolder = mails.importantFolders;
      this.dataUnread = mails.dataUnread;
      this.status = mails.status
    });
    
  }
  nxpmails; data; 
  nextpage(infiniteScroll){
    this.pageinfo.page = this.pageinfo.page+1
    //console.log(this.pageinfo.page)
    setTimeout(() => {
      this.mailsservice.getNextPage(this.folderid, this.pageinfo.page)
      .subscribe(
        mails => {
          this.data = mails;
          this.oid = mails.data.objectId;
          this.pageinfo = mails.pageInfo;
          this.nxp = mails.pageInfo.nextPage
          this.impFolder = mails.importantFolders;
          this.dataUnread = mails.dataUnread;
          this.status = mails.status;
          this.length = mails.pageInfo.pageCount;
          for(let i=0; i < 1+this.length; i++){
            this.mails.push(this.data.data[i])
          }
        }
      )
      //console.log("async ended");
      infiniteScroll.complete()
    }, 1000)
  }
  /*reload(){
    this.loadMails(this.folderid)
  }*/
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
      //console.log(this.items)
    }
  }
  public loadMail(objectId, folder){
    this.navCtrl.push(MailsinglePage, {"msgid" : objectId, "folderid": folder} )
  }
  public createMail(){
    this.navCtrl.push(NewmailPage)
  }
}