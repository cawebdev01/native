import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
}
