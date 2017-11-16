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
  nxp; length; cred :any = {}
  nextpage(infiniteScroll){
    this.cred= { folder : this.folder}
    this.page.page = this.page.page
    this.nxp = this.page.nextPage
    setTimeout(()=>{
     this.storageService.getNextpage(this.cred)
      .subscribe( file =>{
        this.data = file.data;
        this.page = file.pageInfo;
        this.nxp = file.pageInfo.nextPage;
        this.length = file.data.length;
        for(let i=0; i< this.length; i++){
          this.data.push(this.data[i])
        }
      })
      infiniteScroll.complete()
    }, 1000)
  }
}
