import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageServiceProvider } from '../../../providers/storage-service/storage-service'
import { StoragefilesPage } from '../storagefiles/storagefiles';

@Component({
  selector: 'page-storagefolders',
  templateUrl: 'storagefolders.html',
})
export class StorageFolders {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storageservice: StorageServiceProvider,
    private alertCtrl: AlertController,
  ) {
      this.loadfolder()
  }
  data; sysfolders; persofolder;total;
  loadfolder(){
    this.storageservice.getStorageFolders().subscribe(files=>{
      this.total = files.total 
      this.sysfolders = files.folders.systemFolders;
      this.persofolder = files.folders.personalFolders;
      this.persofolder.shift()
      this.data = files.data;
    })
  }
  getdetails(folder){
    this.navCtrl.push(StoragefilesPage, {"folder": folder})
  }
  newfolder(){
    let alert = this.alertCtrl.create({
      title: 'New folder',
      inputs:[{name: 'newfolder', placeholder: 'Name', type: 'text'}],
      buttons:[{ text: 'Cancel', role: 'cancel', handler: data =>{ }},
        {text: 'OK', handler: data => {
          this.storageservice.createFolder(data.newfolder).then((result)=>{
            this.loadfolder()
          }, (err)=>{
            console.log("error " + err)
          })
        }
        }
      ]
    })
    alert.present()
  }

  credential ={name:'', tid:''}
  editfolder(tid, folder){
    let alert = this.alertCtrl.create({
      title: 'Edit Tasklist',
      message : ' Enter the new Tasklist name?',
      inputs: [{name:'name', placeholder: folder, type: 'text'}], 
      buttons: [{text : 'Cancel', role: 'cancel', handler: data => { }}, 
      {text: 'Save', handler: data =>{
        this.credential.name = data.name
        this.credential.tid = tid
        this.storageservice.updateFolder(data.name, 1, tid).then((result)=>{
          this.loadfolder()
        }, (err)=>{})
      }}]
    })
    alert.present()
  }
  trashfolder(tid){
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure you want to delete this Storage folder and all contents ?',
      buttons: [
        {
          text : 'Cancel', 
          role: 'cancel',
          handler: ()=> {
            console.log('Cancel clicked')
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked')
            this.storageservice.deleteFolder(tid).then((result)=>{
              this.loadfolder()
            }, (err)=>{
              console.log("erreur "+ err)
            })
          }
        }
      ] 
    })
    alert.present()
  }
}
