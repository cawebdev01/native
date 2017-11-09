import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-noteupdate',
  templateUrl: 'noteupdate.html',
})
export class NoteupdatePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteupdatePage');
  }

  cancel(){
    this.viewCtrl.dismiss()
  }
}
