import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { CalendarsServiceProvider } from '../../../providers/calendars-service/calendars-service'
//import { Calendar } from '@ionic-native/calendar'

import { NeweventPage } from '../newevent/newevent'

import { NgCalendarModule } from 'ionic2-calendar'
import * as moment from 'moment'

@Component({
  selector: 'page-calendardetail',
  templateUrl: 'calendardetail.html',
})
export class CalendardetailPage {
calname; viewTitle; data; essai;
eventSource = []
selectedDay = new Date()
calendar = {
  mode: 'month',
  locale: 'fr-FR',
  currentDay: new Date()
}
  constructor(
    public navCtrl: NavController, 
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private calService: CalendarsServiceProvider, 
  ) {
    this.calname = navParams.get("calname");
    this.getEvents();
  }
  cat; calendars; year; month; date;
  getEvents(){
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.calService.getEvents(this.calname, this.month, this.year ).subscribe(cal =>{
      this.calendars = cal.calendars;
      this.cat = cal.categories;
      this.data = cal.data;
      //this.eventSource = cal.data
    })
  }
  addEvent() {
    let modal = this.modalCtrl.create(NeweventPage, {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onCurrentDateChanged = (ev: Date) => {
    console.log('Currently viewed date: ' + ev);
  };
  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

}
