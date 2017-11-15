import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MailsServiceProvider } from '../../../providers/mails-service/mails-service'

import { TranslateService } from '@ngx-translate/core';

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
    public alertCtrl: AlertController,
    private mailsserrvice: MailsServiceProvider,
    private translate : TranslateService,
  ) {
    this.loadFolder()
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
  folder = {name:'', parent:'', imp:''}
  newfolder(){
    let a: any = {};
    this.translate.get(['web2cs_mail_create_folder','web2cs_label_enter_name', 'button_cancel', 'web2cs_ok']).subscribe(t=>{
      a.title = t["web2cs_mail_create_folder"]
      a.msg = t["web2cs_label_enter_name"]
      a.btncan = t["button_cancel"]
      a.btnok = t["web2cs_ok"] 
    })
    let alert = this.alertCtrl.create({
      title : a.title,
      message: a.msg,
      inputs : [{name: 'name', type: 'text'}],
      buttons:[{text: a.btncan, role: 'cancel', handler: data=>{}},
      {text: a.btnok, handler: data=>{
        this.folder = { name: data.name, parent:'', imp:'0'}
        this.mailsserrvice.createFolder(this.folder).then((result)=>{
          this.loadFolder()
        }, (err)=>{
          console.log("erreur "+ err)
        })
      }}]
    })
    alert.present()
  }
  editfolder(name, oid){

    let a: any = {};
    this.translate.get(['button_update','web2cs_label_enter_name', 'button_cancel', 'web2cs_ok']).subscribe(t=>{
      a.title = t["button_update"]
      a.msg = t["web2cs_label_enter_name"]
      a.btncan = t["button_cancel"]
      a.btnok = t["web2cs_ok"] 
    })
    let alert = this.alertCtrl.create({
      title : a.title,
      message: a.msg,
      inputs : [{name: 'name', type: 'text', placeholder: name}],
      buttons:[{text: a.btncan, role: 'cancel', handler: data=>{}},
      {text: a.btnok, handler: data=>{
        this.folder = { name: data.name, parent:oid, imp:'0'}
        this.mailsserrvice.updateFolder(this.folder).then((result)=>{
          this.loadFolder()
        }, (err)=>{
          console.log("erreur "+ err)
        })
      }}]
    })
    alert.present()
  }
  deletefolder(oid){
    let a: any = {};
    this.translate.get(['web2cs_mail_delete_folder', 'button_cancel', 'web2cs_ok']).subscribe(t=>{
      a.title = t["web2cs_mail_delete_folder"]
      a.msg = t["web2cs_mail_delete_folder"] + " ?"
      a.btncan = t["button_cancel"]
      a.btnok = t["web2cs_ok"] 
    })
    let alert = this.alertCtrl.create({
      title : a.title,
      message: a.msg,
      buttons:[{text: a.btncan, role: 'cancel', handler: ()=>{}},
      {text: a.btnok, handler: ()=>{
        this.folder = { name:'', parent:oid, imp:'0'}
        this.mailsserrvice.deleteFolder(this.folder).then((result)=>{
          this.loadFolder()
        }, (err)=>{
          console.log("erreur "+ err)
        })
      }}]
    })
    alert.present()
  }
}