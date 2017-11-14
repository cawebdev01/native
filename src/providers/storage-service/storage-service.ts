import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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
  getStorageContent(folder){
    return this.http.get(this.url+'/cgi-bin/ajaxfile?ACT_FIL_GOPAGE=1&GOPAGE=1&tpl=file_list&SID=3&SENS=1&ID='+this.sessionid+'&CURRENTUID='+folder+'&FUID=&EXPZIP=0&EPLCSET=&SHRUID=').map((res:Response)=> res.json())
  }
  createFolder(name, fav){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
        this.http.post(
          this.url+'/cgi-bin/ajaxfile?ACT_FIL_NFOLDER=1&NONAVIG=1&tpl=fld_upd&ICON=1&NAME='+name+'&FAVORITE='+fav+'&ID='+this.sessionid, JSON.stringify(name, fav), {headers: header})
          .subscribe(res => { resolve(res.json()) }, (err) => { reject(err) })
      })
  }
  updateFolder(name, fav, fid){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
        this.http.post(
          this.url+'/cgi-bin/ajaxfile?ACT_FIL_PROP=1&EXPANDALL=1&NONAVIG=1&tpl=fld_upd&ICON=1&NAME='+name+'&FAVORITE='+fav+'&FUID='+fid+'&ID='+this.sessionid, JSON.stringify(name, fav, fid), {headers: header})
          .subscribe(res => { resolve(res.json()) }, (err) => { reject(err) })
      })
  }
  deleteFolder(fid){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxfile?ACT_FIL_DEL=1&EXPANDALL=1&NONAVIG=1&tpl=fld_upd&ID='+this.sessionid+'&DELID='+fid, JSON.stringify(fid), {headers: header})
        .subscribe(res => { resolve(res.json()) }, (err) => { reject(err) })
    })
  }
  createFile(){

  }
  updateFile(){

  }
  deleteFile(){

  }
  getNextpage(credentials){
    return this.http.get(this.url+'/cgi-bin/ajaxfile?ACT_FIL_NEXT=1&tpl=file_list&SID='+credentials.sid+'&SENS='+credentials.sens+'&ID='+this.sessionid+'&CURRENTUID='+credentials.folder+'&FUID='+credentials.fuid+'&EXPZIP='+credentials.exploreZip+'&EPLCSET='+credentials.exploreCharset+'&SHRUID='+credentials.shareObjectId+'&SHOW_MODE='+credentials.showMode).map((res: Response)=> res.json())
  }
}
