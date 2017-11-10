import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AbooksService } from '../../../providers/abooks-service/abooks-service'

@Component({
  selector: 'page-abookcontact',
  templateUrl: 'abookcontact.html',
})
export class AbookcontactPage {
abid; cuid;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private abookservice : AbooksService,
  ) {
    this.abid = navParams.get("abid");
    this.cuid = navParams.get("cuid");
    this.loadContact()
  }
  cn; job; bth; cnotes
  loadContact(){
    this.abookservice.getABContact(this.abid, this.cuid).subscribe(contact =>{
      this.cn = contact.composeName
      this.job = contact.jobtitle
      this.bth = contact.contactDates
      this.cnotes = contact.contactNotes
    })
  }
}
