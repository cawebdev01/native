import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CalendarsServiceProvider {
sessionid; url;
  constructor(public http: Http) {
    this.sessionid = localStorage.getItem('sessionid')
    this.url = localStorage.getItem('url')
  }
  getCalslist(){
    return this.http.get(this.url+'/cgi-bin/ajaxcal?ActSearch=1&FromWebmail=1&tpl=eventlist&norefresh&start_year_list=2017&start_month_list=9&start_day_list=21&end_year_list=2017&end_month_list=12&end_day_list=13&UserCalDisplayMode=&FullReload=1&istitles=1&search_string=&search_class=1&ID='+this.sessionid).map((res:Response) => res.json())
  }
  getEvents(calname, month, year){
    return this.http.get(this.url+'/cgi-bin/ajaxcal?ActSearch=1&listview=1&FromWebmail=1&tpl=eventlist&use_pages=1&usecalname=1&UserCalDisplayMode=&CalName='+calname+'&start_year_list='+year+'&start_month_list='+month+'&start_day_list=1&end_year_list=&end_month_list=&end_day_list=&FullReload=1&istitles=1&search_string=&search_class=1&ID='+this.sessionid).map((res:Response)=>res.json());
  }
  createCal(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxcal?ActUserCalSave=1&FromWebmail&CalName=&UserCalName='+credentials.calname+'&UserCalDisplayMode='+credentials.cdm+'&UserCalComment=&UserCalEventColor='+credentials.color+'&tpl=calendar_edit&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  updateCal(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxcal?ActUserCalSave=1&FromWebmail&CalName='+credentials.cid+'&UserCalName='+credentials.calname+'&UserCalDisplayMode='+credentials.cdm+'&UserCalComment=&UserCalEventColor='+credentials.color+'&tpl=calendar_edit&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  deleteCal(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxcal?ActUserCalDelete=1&FromWebmail&CalName='+credentials.calname+'&tpl=calendar_edit&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  createEvent(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxcal?ActEventAdd=1&FromWebmail=1&tpl=eventupd&norefresh=1&form=0&color=rgb('+credentials.color+')&title='+credentials.name+'&type='+credentials.type+'&location='+credentials.location+'&description='+credentials.desc+'&is_reminder='+credentials.reminder+'&reminder_email='+credentials.rmemail+'&is_reminder_mobile='+credentials.rmmobile+'&reminder_time='+credentials.rmtime+'&reminder_note=&class=5&start_day='+credentials.sday+'&start_month='+credentials.smonth+'&start_year='+credentials.syear+'&all_day='+credentials.alday+'&start_hour='+credentials.shour+'&start_minute='+credentials.smin+'&end_day='+credentials.eday+'&end_month='+credentials.emonth+'&end_year='+credentials.eyear+'&end_hour='+credentials.ehour+'&end_minute='+credentials.emin+'&organizerName=&add_attendee=&from='+credentials.mail+'&invitations_subject=&is_rep=0&CalName='+credentials.cnid+'&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  updateEvent(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxcal?ActEventUpdate=1&norefresh=1&update_mode=&update_date=20171116T134500&recurrence_date=&recurrence_type=&FromWebmail=1&tpl=eventupd&uid=20171116te-ca01%40d1.dc.xandmail.com-20171113130147571&color=rgb(164%2C%20189%2C%20252)&title=exelf&type=1&location=92%20-%2098%20bd%20Victor%20Hugo%2C%209200%20Clichy%2C%20francefd&description=une%20meklfd&is_reminder=1&reminder_email=ca01%40d1.dc.xandmail.com&is_reminder_mobile=0&reminder_time=10&reminder_note=&class=5&start_day=17&start_month=11&start_year=2017&all_day=0&start_hour=11&start_minute=30&end_day=25&end_month=11&end_year=2017&end_hour=13&end_minute=0&organizerName=&add_attendee=&from=ca01@d1.dc.xandmail.com&invitations_subject=&is_rep=0&CalName=&OldCalName=5&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  deleteEvent(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxcal?ActEventDelete=1&norefresh=1&CalName='+credentials.calid+'&update_mode=&update_date='+credentials.upddate+'&FromWebmail=1&tpl=eventdel&uid='+credentials.uid+'&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
}
