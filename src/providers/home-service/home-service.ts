import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HomeServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeServiceProvider {
  public sessionid: string;
  constructor(public http: Http) {
     this.sessionid = localStorage.getItem('sessionid')
  }
    getNewMails(){
      return this.http.get('http://www1.dc.xandmail.com/ca/testbuild_leggera/cgi-bin/ajaxmail?Act_Msgs_Unread_List=1&Tpl=mail_list&ID='+this.sessionid).map((res:Response)=> res.json())
    }

}
