import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MailsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MailsServiceProvider {
  sessionid: string; url : string; 
  constructor(public http: Http) { 
    this.sessionid = localStorage.getItem('sessionid')
    this.url = localStorage.getItem('url')
  }
  getMails(){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_Msgs=1&Tpl=mail_list&ID='+this.sessionid).map((res:Response)=> res.json())
  }
  getMail(msgid){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_View=1&ShowFullHeaders=1&ID='+this.sessionid+'&CONTID=&msgID='+msgid+'&C_Folder=SU5CT1g=').map((res:Response)=>res.json())
      //'/cgi-bin/ajamail?Act_View&ShowFullHeaders=1&ID='+this.sessionid+'&CONTID=&msgId='+msgid+'&C_Folder=SU5CT1g=&R_Folder=SU5CT1g=&Body=&TNEF=&nocache='
    
  }
  markasRead(msgid){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_Msgs_MarkRead=1&Tpl=mail_list&SpamFilter=&CONTID=&ID='+this.sessionid+'&C_Folder=SU5CT1g=&Msg_Nb=1&Msg_Sel_1='+msgid+'&noreload=&nocache=').map((res:Response) => res.json());    
  }
}
