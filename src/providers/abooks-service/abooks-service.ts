import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AbooksServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AbooksService {
sessionid; url; 
  constructor(public http: Http) {
    this.url = localStorage.getItem('url');
    this.sessionid = localStorage.getItem('sessionid');
  }
  getABList(){
    return this.http.get(this.url+'/cgi-bin/ajaxpab?ACT_CL_TB=1&&FVAL=105&SENS=0&ABID=&tpl=main&ID='+this.sessionid).map((res:Response) => res.json())
  }
  getABContent(objectid){
    return this.http.get(this.url+'/cgi-bin/ajaxpab?ACT_CL_TB=1&FVAL=105&SENS=0&ABID='+objectid+'&tpl=contact_list&ID='+this.sessionid).map((res:Response)=> res.json())
  }
}
