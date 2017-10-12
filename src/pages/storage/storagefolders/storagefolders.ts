import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-storagefolders',
  templateUrl: 'storagefolders.html',
})
export class StorageFolders {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoragefoldersPage');
  }

}
