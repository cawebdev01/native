import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TasksServiceProvider {
  url; sessionid;
  constructor(public http: Http) { 
    this.sessionid= localStorage.getItem('sessionid');
    this.url = localStorage.getItem('url');
  }
  getTasksList(){
    return this.http.get(this.url+'/cgi-bin/ajaxtasks?ACT_TASKLIST_LIST=1&GOPAGE=1&TLUID=&FILTER=&SORT=&tpl=tasklist_list&ID='+this.sessionid).map((res:Response)=>res.json());
  }
  getTasks(tasklist){
    return this.http.get(this.url+'/cgi-bin/ajaxtasks?ACT_TASK_LIST=1&GOPAGE=1&TLUID='+tasklist+'&FILTER=&SORT=&tpl=tasklist_content&ID='+this.sessionid).map((res:Response)=>res.json());
  }
  getTaskdetail(tasklist, taskid){
    return this.http.get(this.url+'/cgi-bin/ajaxtasks?ACT_TASK=1&TLUID='+tasklist+'&TUID='+taskid+'&tpl=taskedit&ID='+this.sessionid).map((res:Response)=>res.json());
  }
  postTask(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxtasks?ACT_TASK_SET=1&GOPAGE=1&COMMENT='+credentials.comment+'&EDAY='+credentials.eday+'&EMON='+credentials.emonth+'&EYEAR='+credentials.eyear+'&NAME='+credentials.name+'&PERCENT='+credentials.percent+'&PRIORITY='+credentials.priority+'&SDAY='+credentials.sday+'&SMON='+credentials.smonth+'&STATUS='+credentials.status+'&SYEAR='+credentials.syear+'&TLUID='+credentials.tlid+'&TUID=&tpl=tasklist_content&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
        .subscribe(res => { resolve(res.json()) }, (err) => { reject(err) })
    })
  }
}
