import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
 
@Component({
  selector: 'page-newevent',
  templateUrl: 'newevent.html',
})
export class NeweventPage {
 
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }
 
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    console.log(this.event)
    this.viewCtrl.dismiss(this.event);
  }
}