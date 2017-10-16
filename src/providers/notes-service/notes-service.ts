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

}
