import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { CalendarsServiceProvider } from '../../../providers/calendars-service/calendars-service'
import { CalendarComponent } from 'ionic2-calendar/calendar'

//import { Calendar } from '@ionic-native/calendar'

import { NeweventPage } from '../newevent/newevent'

import { NgCalendarModule } from 'ionic2-calendar'
import * as moment from 'moment'
//import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
  selector: 'page-calendardetail',
  templateUrl: 'calendardetail.html',
})
export class CalendardetailPage {
   @ViewChild(CalendarComponent) myCalendar: CalendarComponent;

calname; viewTitle; data; essai; testeSource:[{title:'', startTime:Date, endTime: Date, allDay: Boolean}]
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
    //this.loadEvents()
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
  loadEvents(){
    let et = new Date(Date.UTC(2017, 10, 3, 12, 5))
    let st = new Date(Date.UTC(2017, 10, 15, 16, 45))
    let eventData = {
      title: 'test1',
      startTime: st,
      endTime: et,
      allDay: true
    }
    let events =this.eventSource
    this.eventSource.push()
    this.eventSource = [];
    setTimeout(()=>{

    })
    this.myCalendar.loadEvents()
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
