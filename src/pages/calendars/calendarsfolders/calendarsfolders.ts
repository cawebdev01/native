import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarsServiceProvider } from '../../../providers/calendars-service/calendars-service';
import { CalendardetailPage } from '../calendardetail/calendardetail';
@Component({
  selector: 'page-calendarsfolders',
  templateUrl: 'calendarsfolders.html',
})
export class CalendarsFolders {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private calService: CalendarsServiceProvider,
  ) {
    this.loadCals()
  }
  status; calendars;
  loadCals(){
    this.calService.getCalslist().subscribe(cals =>{
      this.status = cals.status;
      this.calendars = cals.calendars;
    })
  }
  caldetails(coid){
    this.navCtrl.push(CalendardetailPage, {"calname": coid})
  }
}
