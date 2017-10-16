import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageServiceProvider } from '../../../providers/storage-service/storage-service'

@Component({
  selector: 'page-storagefolders',
  templateUrl: 'storagefolders.html',
})
export class StorageFolders {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storageservice: StorageServiceProvider) {
      this.loadfolder()
  }
  data; sysfolders; persofolder;total;
  loadfolder(){
    this.storageservice.getStorageFolders().subscribe(files=>{
      this.total = files.total 
      this.sysfolders = files.folders.systemFolders;
      this.persofolder = files.folders.personalFolders;
      this.data = files.data;
    })
  }
}
