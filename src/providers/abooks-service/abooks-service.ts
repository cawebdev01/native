import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

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
  getABContact(abid, cuid){
    return this.http.get(this.url+'/cgi-bin/ajaxpab?ACT_CT_LEDIT=1&tpl=contact_preview&CUID='+cuid+'&ABID='+abid+'&ID='+this.sessionid).map((res:Response)=>res.json())
  }
  getnextpage(abid){
    return this.http.get(this.url+'/cgi-bin/ajaxpab?ACT_CL_NEXT=1&FVAL=105&tpl=contact_list&ID='+this.sessionid+'&ABID='+abid).map((res:Response)=> res.json())
  }
  createList(name){
    return new Promise((resolve, reject) =>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxpab?ACT_USERAB_SETOK=1&tpl=userabook_edit&NAME='+name+'&NICKNAME='+name+'&COMMENT=&ATOMICREQ=1&ID='+this.sessionid, JSON.stringify(name), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  createContact(credentials){
    return new Promise((resolve, reject) =>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxpab?force=0&nbFields=6&nbAddressFields=0&nbDateFields=1&CUID=&FLAGS=0&ABID=_xamUAB%3A2&NN=&FN=mael&LN=jamoe&WTITLE=&WCPNY=aruba&param_type_1=phone_mobile&param_value_1=0615057777&param_default_1=0&param_kind_1=phone&param_type_2=email_email_personal&param_value_2=contact%40boss.fr&param_default_2=0&param_kind_2=email&param_type_3=websites_HURL&param_value_3=&param_default_3=0&param_kind_3=websites&param_type_4=socials_social_facebook&param_value_4=&param_default_4=0&param_kind_4=socials&param_type_5=im_im_gtalk&param_value_5=&param_default_5=0&param_kind_5=im&ADDR_LABEL_NAME_1=HLABEL&HSTREET2_=&HSTREET_=&HZIP_=&HCITY_=&HCNTY_=&HSTATE_=&WNOTE=&ACT_CT_LOK=1&tpl=contact_preview&SHOWUPDATE=1&AJAXMODE=1&ID=', JSON.stringify(name), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
                                              //force=0&nbFields=8&nbAddressFields=1&nbDateFields=2&CUID=&FLAGS=0&ABID=_xamUAB%3A2&NN=&FN=dfe&LN=fez&WTITLE=%20nth&WCPNY=vbre&param_type_1=phone_mobile&param_value_1=0123456789&param_default_1=0&param_kind_1=phone&param_type_2=email_email_personal&param_value_2=9874563210&param_default_2=0&param_kind_2=email&param_type_7=email_email_personal&param_value_7=9638527410&param_default_7=0&param_kind_7=email&param_type_3=websites_HURL&param_value_3=www.treest.fr&param_default_3=0&param_kind_3=websites&param_type_4=socials_social_facebook&param_value_4=fzfd&param_default_4=0&param_kind_4=socials&param_type_5=im_im_gtalk&param_value_5=dzcgr%40gmail.com&param_default_5=0&param_kind_5=im&ADDR_LABEL_NAME_1=HLABEL&HSTREET2_1=3&HSTREET_1=zccdz&HZIP_1=987450&HCITY_1=fdez&HCNTY_1=france&HSTATE_1=&DTITLE_1=dbirthday&DDAY_1=10&DMONTH_1=11&DYEAR_1=2017&WNOTE=cezcd&ACT_CT_LOK=1&tpl=contact_preview&SHOWUPDATE=1&AJAXMODE=1&ID=IeBAIDJo0bNnDkkRNGBAKPHSJx8LFixwscJijiEcIXoRZkDRIxIg-&nocache=530349.1861932506
    })
  }
  updateList(credentials){
    return new Promise((resolve, reject) =>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxpab?ACT_USERAB_SETOK=1&tpl=userabook_edit&UABID='+credentials.oid+'&NAME='+credentials.name+'&NICKNAME='+credentials.name+'&COMMENT=&ATOMICREQ=1&ID='+this.sessionid, JSON.stringify(credentials), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  updateContact(){
    //force=0&nbFields=8&nbAddressFields=0&nbDateFields=1&CUID=1&FLAGS=0&ABID=_xamUAB%3A2&NN=mael%20jamoe&FN=maelaz&LN=jamoeaz&WTITLE=az&WCPNY=arubaaz&param_type_1=phone_mobile&param_value_1=0615057777&param_default_1=0&param_kind_1=phone&param_type_2=phone_mobile&param_value_2=&param_default_2=0&param_kind_2=phone&param_type_3=email_email_personal&param_value_3=contact%40boss.frz&param_default_3=0&param_kind_3=email&param_type_4=email_email_personal&param_value_4=&param_default_4=0&param_kind_4=email&param_type_5=websites_HURL&param_value_5=&param_default_5=0&param_kind_5=websites&param_type_6=socials_social_facebook&param_value_6=&param_default_6=0&param_kind_6=socials&param_type_7=im_im_gtalk&param_value_7=&param_default_7=0&param_kind_7=im&ADDR_LABEL_NAME_2=HLABEL&HSTREET2_=&HSTREET_=&HZIP_=&HCITY_=&HCNTY_=&HSTATE_=&WNOTE=&ACT_CT_LOK=1&tpl=contact_preview&SHOWUPDATE=1&AJAXMODE=1&ID=IeBAIDJo0bNnDkkRNGBAKPHSJx8LFixwscJijiEcIXoRZkDRIxIg-&nocache=48824.44091912741
    return new Promise((resolve, reject) =>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url, JSON.stringify(name), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  deleteContact(abid, cid){
    return new Promise((resolve, reject) =>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxpab?ACT_OL_DEL_OK=1&RESETPAGE=1&FVAL=105&ABID='+abid+'&tpl=contact_list&ID='+this.sessionid+'&CID='+cid, JSON.stringify(name), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
  deleteList(abid){
    return new Promise((resolve, reject) =>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
      this.http.post(this.url+'/cgi-bin/ajaxpab?ACT_USERAB_DELOK=1&tpl=userabook_delete&NAME=&UABID='+abid+'&ATOMICREQ=1&ID='+this.sessionid, JSON.stringify(name), {headers: header})
      .subscribe(res=> {resolve(res.json())}, (err)=>{reject(err)})
    })
  }
}
