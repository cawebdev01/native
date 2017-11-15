import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class LoginService {
  currentUser;
  email;
  password;
  sessionid;

  constructor(public http: Http) {
  }
  login(credentials){
    return new Promise((resolve, reject) =>{
      let header = new Headers()
      header.append('Content-Type', 'application/json')
     /* let url = 'https://webmailstaffnewuitest.aruba.it'
      let body = 'cgi-bin/ajaxmail'
      let option = 'Act_Msgs=1&Tpl=login&LOGIN='+credentials.email+'&PASSWD='+credentials.password+'&SG_Lang='+credentials.lang+', JSON.stringify(credentials), {headers: header}'*/
      this.http.post(
        //url, body, option )
        //'https://webmailstaff.aruba.it/cgi-bin/ajaxmail?Act_Msgs=1&Tpl=login&LOGIN='+credentials.email+'&PASSWD='+credentials.password+'&SG_Lang='+credentials.lang, JSON.stringify(credentials), {headers: header})
        'http://www1.dc.xandmail.com/ca/testbuild_leggera/cgi-bin/ajaxmail?Act_Msgs=1&Tpl=login&LOGIN='+credentials.email+'&PASSWD='+credentials.password+'&SG_Lang='+credentials.lang, JSON.stringify(credentials), {headers: header})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => { 
          reject(err);
        }
      )
    })
  }
  public getUserInfo() : User {
    return this.currentUser
  }
  public logout() {
    this.sessionid = localStorage.getItem('sessionid');
     //this.http.get('https://webmailstaff.aruba.it/cgi-bin/ajaxmail?Act_Logout=1&&CleanSession=1&ID='+this.sessionid)
    this.http.get('http://www1.dc.xandmail.com/ca/testbuild_leggera/cgi-bin/ajaxmail?Act_Logout=1&&CleanSession=1&ID='+this.sessionid)
  }
}
export class User{
  password : string;
  email : string;
  lang: string;  
  constructor(
    password, 
    email, 
    lang,
  ){
    this.email = email;
    this.password = password;
    this.lang = lang
  }
}
