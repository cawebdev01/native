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
  updatetask(){
   /* ACT_TASK_SEARCH_ALL=1&RDL=1&tpl=taskinfo&SORT=&SYEAR=2017&SMON=11&SDAY=2&EYEAR=2017&EMON=11&EDAY=2&FILTER=8&ID=IeBAKmTBw2ZMCRcyc@BAJp0LlGnm3btO3RvR_MzXtkR9v.Onztmw-&nocache=622929.2698639015
    ACT_TASK_SET=1&GOPAGE=1&COMMENT='+credentials.content+'&EDAY=5&EMON=9&EYEAR=2019&NAME=tache%201bis&PERCENT=0&PRIORITY=3&SDAY=5&SMON=9&STATUS=2&SYEAR=2016&TLUID=1&TUID=2&tpl=tasklist_content&ID=IeBAKmTBw2ZMCRcyc@BAJp0LlGnm3btO3RvR_MzXtkR9v.Onztmw-&nocache=928828.6087580406*/
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
/*
ACT_TASK_SEARCH_ALL=1&RDL=1&tpl=taskinfo&SORT=&SYEAR=2017&SMON=11&SDAY=2&EYEAR=2017&EMON=11&EDAY=2&FILTER=8&ID=IeBAKmTBw2ZMCRcyc@BAJp0LlGnm3btO3RvR_MzXtkR9v.Onztmw-&nocache=737864.3013536943*/