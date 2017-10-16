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
  data; perso;
  loadfolder(){
    this.storageservice.getStorageFolders().subscribe(folders=>{
      this.data = folders.data;
      this.perso = folders.personalFolders;
    })
  }
}
