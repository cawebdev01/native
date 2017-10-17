import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarsServiceProvider } from '../../../providers/calendars-service/calendars-service'
@Component({
  selector: 'page-calendardetail',
  templateUrl: 'calendardetail.html',
})
export class CalendardetailPage {
calname;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private calService: CalendarsServiceProvider, 
  ) {
    this.calname = navParams.get("calname");
    this.getEvents();
  }
  cat; calendars; data; year; month; date;
  getEvents(){
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.calService.getEvents(this.calname, this.month, this.year ).subscribe(cal =>{
      this.calendars = cal.calendars;
      this.cat = cal.categories;
      this.data = cal.data;

    })
  }

}
