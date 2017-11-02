import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'modaltaskupdate.html'
})
export class ModalupdatetaskgroupPage{

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController, 
    ){}
    dismiss(){
        this.viewCtrl.dismiss()
    }
}