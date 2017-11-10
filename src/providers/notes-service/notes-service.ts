import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NotesServiceProvider {
  sessionid; url; 
  constructor(public http: Http) {
    this.url = localStorage.getItem('url');
    this.sessionid= localStorage.getItem('sessionid')
  }
  getNotesList(){
    return this.http.get(this.url+'/cgi-bin/ajaxnotes?ACT_NOTE_LIST=1&Tpl=notelist_list&NLUID=1&GOPAGE=1&ID='+this.sessionid).map((res:Response)=>res.json())
  }
	getNotes(noteid){
    return this.http.get(this.url+'/cgi-bin/ajaxnotes?ACT_NOTE_LIST=1&Tpl=notelist_content&NLUID='+noteid+'&SORT=&allowAccessMode=0&GOPAGE=1&ID='+this.sessionid).map((res:Response)=>res.json())
  }
  getNote(noteid, notegroup){
    return this.http.get(this.url+'/cgi-bin/ajaxnotes?ACT_NOTE=1&tpl=noteedit&NLUID='+notegroup+'&NUID='+noteid+'&ID='+this.sessionid).map((res:Response)=>res.json())
  }
  createNotelist(nlname){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxnotes?ACT_NOTELIST_SET=1&tpl=notelist_edit&NAME='+nlname+'&NLUID=&COMMENT=&ATOMICREQ=1&ID='+this.sessionid, JSON.stringify(nlname), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  updateNotelist(nlname, nluid){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxnotes?ACT_NOTELIST_SET=1&tpl=notelist_edit&NAME='+nlname+'&NLUID='+nluid+'&COMMENT=&ATOMICREQ=1&ID='+this.sessionid, JSON.stringify(nlname, nluid), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  deleteNotelist(nluid){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxnotes?ACT_NOTELIST_DEL=1&tpl=notelist_delete&NLUID='+nluid+'&ATOMICREQ=1&ID='+this.sessionid, JSON.stringify(nluid), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  } 
  createNote(credentials){
    return new Promise((resolve, reject)=>{
    let header = new Headers()
    header.append('Content-Type', 'application/json')
    this.http.post(
      this.url+'/cgi-bin/ajaxnotes?ACT_NOTE_SET=1&tpl=notelist_content&NLUID='+credentials.noteliste+'&NUID=&NAME='+credentials.title+'&CONTENT='+credentials.content+'&GOPAGE=1&FormatHTML=1&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
    .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  updateNote(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxnotes?ACT_NOTE_SET=1&tpl=notelist_content&NLUID='+credentials.noteliste+'&NUID='+credentials.nid+'&NAME='+credentials.title+'&CONTENT='+credentials.content+'&GOPAGE=1&FormatHTML=1&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  deleteNote(nluid, nuid){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxnotes?ACT_NOTE_DEL=1&NLUID='+nluid+'&NUID='+nuid+'&tpl=notelist_content&GOPAGE=1&ID='+this.sessionid, JSON.stringify(nluid, nuid), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
}
