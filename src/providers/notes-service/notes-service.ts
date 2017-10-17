import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
}
