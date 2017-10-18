import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class MailsServiceProvider {
  sessionid: string; url : string; 
  constructor(public http: Http) { 
    this.sessionid = localStorage.getItem('sessionid')
    this.url = localStorage.getItem('url')
  }
  getMails(folderid){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_Msgs=1&Tpl=mail_list&ID='+this.sessionid+'&C_Folder='+folderid).map((res:Response)=> res.json())
  }
  getMail(msgid, cfolder){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_View=1&ShowFullHeaders=1&ID='+this.sessionid+'&CONTID=&msgID='+msgid+'&C_Folder='+cfolder).map((res:Response)=>res.json())
      //'/cgi-bin/ajamail?Act_View&ShowFullHeaders=1&ID='+this.sessionid+'&CONTID=&msgId='+msgid+'&C_Folder=SU5CT1g=&R_Folder=SU5CT1g=&Body=&TNEF=&nocache='
  }
  markasRead(msgid){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_Msgs_MarkRead=1&Tpl=mail_list&SpamFilter=&CONTID=&ID='+this.sessionid+'&C_Folder=SU5CT1g=&Msg_Nb=1&Msg_Sel_1='+msgid+'&noreload=&nocache=').map((res:Response) => res.json());    
  }
  sendMail(credendials){
    return new Promise((resolve, reject) =>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      /*this.http.post(
        this.url+'/cgi-bin/ajaxmail?CheckContainerAlert=&CONTID=&CompoReplyTo='+credendials.email+'&CompoState=1&AutoMsgID=&msgID=&msgStatus=&multiForward=&R_Folder=&HtmlText=<span%20style%3D"font-family%3A%20Arial%3B%20font-size%3A%20small%3B"%20xam-editor-container%3D"true">'+credendials.content+'<%2Fspan>&FormatHTML=0&ExtractPText=1&KeepCopy=1&NotifKind=&Priority=0&Compo_S_ListName=&Abook=&Sig_Sel=&CompoIdx=2&From=ca01%40d1.dc.xandmail.com&From2="ca01"%20<ca01%40d1.dc.xandmail.com>&CompoFFN=ca01&AttachCount=0&FileNb=0&PecRType=0&SentPath=&SaveOnRequestMsgID=&From2Select=ca01%40d1.dc.xandmail.com&AliasToVisible=&AliasTo=ca09%40d1.dc.xandmail.com%2C&AliasCcVisible=&AliasCc=&AliasBccVisible=&AliasBcc=&Subject=loipsume&Act_C_Send=1&ID='+this.sessionid+'&Cos=1'
      )*/
    })
  }
}
