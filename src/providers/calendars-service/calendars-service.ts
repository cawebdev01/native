import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
}
