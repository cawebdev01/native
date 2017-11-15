import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class MailsServiceProvider {
  sessionid: string; url : string; 
  constructor(public http: Http) { 
    this.sessionid = localStorage.getItem('sessionid')
    this.url = localStorage.getItem('url')
  }
  getFolder(){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_Folders=1&Tpl=fld_mgt&ID='+this.sessionid).map((res:Response)=>res.json())
  }
  getMails(folderid){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_Msgs=1&Tpl=mail_list&ID='+this.sessionid+'&C_Folder='+folderid).map((res:Response)=> res.json())
  }
  getNextPage(cfolder, page){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_Msgs_Page_Nth=1&Tpl=mail_list&ID='+this.sessionid+'&C_Folder='+cfolder+'&Page='+page).map((res:Response)=>res.json())
  }
  getMail(msgid, cfolder){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_View=1&ShowFullHeaders=1&ID='+this.sessionid+'&CONTID=&msgID='+msgid+'&C_Folder='+cfolder).map((res:Response)=>res.json())
  }
  markasRead(msgid){
    return this.http.get(this.url+'/cgi-bin/ajaxmail?Act_Msgs_MarkRead=1&Tpl=mail_list&SpamFilter=&CONTID=&ID='+this.sessionid+'&C_Folder=SU5CT1g=&Msg_Nb=1&Msg_Sel_1='+msgid+'&noreload=&nocache=').map((res:Response) => res.json());    
  }
  sendMail(credendials){
    return new Promise((resolve, reject) =>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxmail?CheckContainerAlert=&CONTID=&CompoReplyTo='+credendials.from
        +'&CompoState=1&AutoMsgID=&msgID=&msgStatus=&multiForward=&R_Folder=&HtmlText='+credendials.content
        +'&FormatHTML=1&ExtractPText=1&KeepCopy=1&NotifKind='+credendials.notice+'&Priority='+credendials.high
        +'&Compo_S_ListName=&Abook=&Sig_Sel=&CompoIdx=&From='+credendials.from
        +'&AttachCount=&FileNb=&PecRtype=&SentPath=&SaveOnRequestMsgId='
        +'&AliasTo='+credendials.to
        +'&AliasCc='+credendials.cc
        +'&AliasBcc='+credendials.bcc
        +'&Subject='+credendials.subject
        +'&Act_C_Send=1&ID='+this.sessionid+'&Cos=1', 
        JSON.stringify(credendials), {headers: header}
      ).subscribe(res => { resolve(res.json())}, (err) => { reject(err)})
    })
  }
  deleteMail(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type',  'application/json')
      this.http.post(
        this.url+'/cgi-bin/ajaxmail?Act_Msgs_Del=1&Tpl=mail_list&SpamFilter=&CONTID=&ID='+this.sessionid+'C_Folder='+credentials.folder+'&Msg_Nb=1&Msg_Sel_1=&Page=1',
        JSON.stringify(credentials), {headers: header}
      ).subscribe(res => {resolve(res.json())}, (err) =>{reject(err)})
    })
  }
  createFolder(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxmail?Act_Fl_Creat=1&Fld_Name='+credentials.name+'&CONTID=&Fld_Parent='+credentials.parent+'&Fld_Important='+credentials.imp+'&ID='+this.sessionid,
      JSON.stringify(credentials), {headers: header}
     ).subscribe(res => {resolve(res.json())}, (err)=>{ reject(err)})
    })
  }
  updateFolder(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxmail?Act_Fl_Ren=1&SHOWUPDATE=1&Fld_Name='+credentials.name+'&CONTID=&Fld_P_List='+credentials.parent+'&Fld_Important='+credentials.imp+'&ID='+this.sessionid,
      JSON.stringify(credentials), {headers: header}
     ).subscribe(res => {resolve(res.json())}, (err)=>{ reject(err)})
    })
  }
  deleteFolder(credentials){
    return new Promise((resolve, reject)=>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxmail?Act_Fl_Del_Conf=1&SHOWUPDATE=1&ForceDelete=0&Fld_P_List='+credentials.parent+'&CONTID=&ID='+this.sessionid,
      JSON.stringify(credentials), {headers: header}
     ).subscribe(res => {resolve(res.json())}, (err)=>{ reject(err)})
    })
  }
}
