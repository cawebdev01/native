import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
    private mailsserrvice: MailsServiceProvider,
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
    let alert = this.alertCtrl.create({
      title : 'Create a new mailfolder',
      message: 'Enter the Mailfolder Name',
      inputs : [{name: 'name', type: 'text'}],
      buttons:[{text: 'Cancel', role: 'cancel', handler: data=>{}},
      {text: 'ok', handler: data=>{
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
    let alert = this.alertCtrl.create({
      title : 'Update the mailfolder name',
      message: 'Enter the new Name',
      inputs : [{name: 'name', type: 'text', placeholder: name}],
      buttons:[{text: 'Cancel', role: 'cancel', handler: data=>{}},
      {text: 'ok', handler: data=>{
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
    let alert = this.alertCtrl.create({
      title : 'Delete mailfolder',
      message: 'Are you sure you want to delete this mailfolder and all contents ?',
      buttons:[{text: 'Cancel', role: 'cancel', handler: ()=>{}},
      {text: 'delete', handler: ()=>{
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