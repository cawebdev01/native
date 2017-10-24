import { Component } from '@angular/core';
import { NavController, NavParams , ViewController} from 'ionic-angular';

@Component({
    templateUrl: 'modaltask.html'
})
export class ModaltaskPage{
    constructor(
        public viewCtrl : ViewController,
    ){

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}