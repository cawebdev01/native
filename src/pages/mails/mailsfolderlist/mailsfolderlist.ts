import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MailsServiceProvider } from '../../../providers/mails-service/mails-service'


import { MailsFolders } from '../mailsfolders/mailsfolders';

@Component({
  selector: 'page-mailsfolderlist',
  templateUrl: 'mailsfolderlist.html',
})
export class MailsfolderlistPage {
 statuserrcode; data; accountSize; accountMaxSize; dataunread; qte; qteraw;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private mailsserrvice: MailsServiceProvider,
  ) {
    this.loadFolder()
    //this.qteraw = (parseInt(this.accountSize)*100)/(parseInt(this.accountMaxSize))
    console.log(this.qteraw);
    //this.qte = Math.round(this.qteraw)
  }
 
  loadFolder(){
    this.mailsserrvice.getFolder().subscribe(folders =>{
      this.statuserrcode = folders.status.err_code
      this.data = folders.data
      this.accountSize = folders.accountSize
      this.accountMaxSize = folders.accountMaxSize
      this.dataunread = folders.dataUnread
      this.qteraw = (parseInt(this.accountSize)*100)/(parseInt(this.accountMaxSize))
    })
  }
  mails(fid, title){ 
		this.navCtrl.push(MailsFolders, {"folderid": fid, "title": title })
  }
  test(){
    alert("ca roule! "+ this.data.id)
  }
  action(espression){
    if(espression=="MOVE"){
      this.move_act()
    } else if(espression == "REMOVE"){
      console.log("On enleve")
    }
    else if (espression == "EDIT"){
      console.log("On edite")
    }
    else if (espression=="ADDCHILD"){
      console.log("On ajoute un enfant!")
    }
    //console.log(espression)
  }
  move_act(){
    console.log("On deplace toto")
  }
}