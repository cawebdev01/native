import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StorageServiceProvider {
sessionid; url;
  constructor(public http: Http) {
   this.url = localStorage.getItem('url');
   this.sessionid =localStorage.getItem('sessionid');
  }
  getStorageFolders(){
    return this.http.get(this.url+'/cgi-bin/ajaxfile?ACT_FIL_GOPAGE=1&GOPAGE=1&EXPANDALL=1&tpl=main&SID=3&SENS=1&ID='+this.sessionid).map((res:Response)=> res.json())
  }
  getStorageContent(){
    return this.http.get(this.url+'/cgi-bin/ajaxfile?ACT_FIL_GOPAGE=1&GOPAGE=1&tpl=file_list&SID=3&SENS=1&ID='+this.sessionid)
  }
}
