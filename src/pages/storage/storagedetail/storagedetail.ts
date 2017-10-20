import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-storagedetail',
  templateUrl: 'storagedetail.html',
})
export class StoragedetailPage {
  path; type;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    private fileOpener : FileOpener,
  ) {
    this.path = navParams.get("path");
    this.type = navParams.get("type");
    this.open(this.path, this.type)
  }
open(path, type){}
 /* this.fileOpener.open(path, type)
  .then(()=> console.log('file is opened'))
  .catch(e => console.log('Error opening file', e))
}*/
}
