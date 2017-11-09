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
  taskList(name){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
        this.http.post(
          this.url+'/cgi-bin/ajaxtasks?ACT_TASKLIST_SET=1&ATOMICREQ=1&NAME='+name+'&TLUID=&tpl=tasklist_edit&ID='+this.sessionid, JSON.stringify(name), {headers: header})
          .subscribe(res => { resolve(res.json()) }, (err) => { reject(err) })
      })
  }
  updateGroup(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxtasks?ACT_TASKLIST_SET=1&ATOMICREQ=1&NAME='+credentials.name+'&TLUID='+credentials.tid+'&tpl=tasklist_edit&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
        .subscribe(res=>{resolve(res.json())},(err)=>{reject(err)})
      })
  }
  deleteGroup(tluid){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url +'/cgi-bin/ajaxtasks?ACT_TASKLIST_DEL=1&ATOMICREQ=1&TLUID='+tluid+'&tpl=tasklist_delete&ID='+this.sessionid, JSON.stringify(tluid), {headers: header})
        .subscribe(res => {resolve(res.json())}, (err)=> {reject(err)})
    })
    
  }
  updatetask(cre){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxtasks?ACT_TASK_SET=1&GOPAGE=1&COMMENT='+cre.comment+'&EDAY='+cre.eday+'&EMON='+cre.emon+'&EYEAR='+cre.eyear+'&NAME='+cre.name+'&PERCENT='+cre.percent+'&PRIORITY='+cre.priority+'&SDAY='+cre.sday+'&SMON='+cre.smon+'&STATUS='+cre.status+'&SYEAR='+cre.syear+'&TLUID='+cre.tlid+'&TUID='+cre.tid+'&tpl=tasklist_content&ID='+this.sessionid, JSON.stringify(cre), {headers: header})
        .subscribe(res => {resolve(res.json())}, (err)=> {reject(err)}) 
    })
  }
  deletetask(tluid, tid){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url + '/cgi-bin/ajaxtasks?ACT_TASK_DEL=1&GOPAGE=1&TLUID='+tluid+'&TUID='+tid+'&tpl=tasklist_content&ID='+this.sessionid, JSON.stringify(tluid, tid), {headers: header})
        .subscribe(res => {resolve(res.json())},(err)=>{reject(err)})
    })
  }

}