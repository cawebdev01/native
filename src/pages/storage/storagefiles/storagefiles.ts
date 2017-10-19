import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageServiceProvider } from '../../../providers/storage-service/storage-service' 
import { StoragedetailPage } from '../storagedetail/storagedetail'

@Component({
  selector: 'page-storagefiles',
  templateUrl: 'storagefiles.html',
})
export class StoragefilesPage {
  folder
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storageService : StorageServiceProvider,
  ) {
    this.folder = navParams.get("folder");
    this.loadContent()
  }
  data; total; page;
  loadContent(){
    this.storageService.getStorageContent(this.folder).subscribe(file =>{
      this.data = file.data;
      this.total = file.total;
      this.page = file.pageInfo;
    })
  }
  loadfile(path, type){
    this.navCtrl.push(StoragedetailPage, {"path": path, "type": type})
  }
}
