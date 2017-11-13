import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
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
  calData={calname:'', cdm:'', color:''}
  newcal(){
    let alert = this.alertCtrl.create({
      title: 'Create Calendar',
      message: 'Enter the Calendar name',
      inputs:[{ name:'name', placeholder: 'Name', type: 'text'}, {name:'color', type: 'text'}, {name: 'fav', type: 'checkbox'}],
      buttons:[{text: 'Cancel', role:'cancel', handler: data=>{}},
    {text:'OK', handler: data=>{
      this.calData.calname = data.name
      //this.calData.cdm = data.fav
      data.fav == true ? this.calData.cdm ='0': this.calData.cdm = '2'
      this.calData.color = data.color
      console.log(this.calData)
      this.calService.createCal(this.calData).then((result)=>{
        this.loadCals()
      }, (err)=>{
        console.log('err '+err)
      })
    }}]
    })
    alert.present()
  }
  updateCal(){
    let alert = this.alertCtrl.create({
      title: 'Update Calendar',
      message: 'Enter the new Calendar name',
      inputs: [{name:'name', placeholder: name, type:'text'}],
      buttons:[{text: 'Cancel', role:'cancel', handler:data=>{}},
    {text:'OK', handler: data=>{
      this.calService.updateCal(data.name).then((result)=>{
        this.loadCals()
      }, (err)=>{
        console.log('err '+ err)
      })
    }}]
    })
    alert.present()
  }
  deleteCal(){
    let alert = this.alertCtrl.create({
      title: 'Delete Calendar',
      message: 'This calendar will be permanently deleted!',
      buttons:[{text: 'Cancel', role:'cancel', handler:data=>{}},
    {text:'OK', handler: data=>{
      this.calService.deleteCal(data.name).then((result)=>{
        this.loadCals()
      }, (err)=>{
        console.log('err '+ err)
      })
    }}]
    })
    alert.present()
  }
}
