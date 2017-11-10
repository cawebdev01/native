import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AbooksService } from '../../../providers/abooks-service/abooks-service'
import { AbookcontactPage } from '../abookcontact/abookcontact';
@Component({
  selector: 'page-abookslist',
  templateUrl: 'abookslist.html',
})
export class AbookslistPage {
  oid; title
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private abooksService: AbooksService,
    
   ) {
    this.oid = navParams.get("oid"),
    this.title = navParams.get('name')
    this.loadABContent()
  }

  contacts
  loadABContent(){
    this.abooksService.getABContent(this.oid).subscribe(content =>{
      this.contacts = content.data
    })
  }
  contactdetail(objectId, abid){
    this.navCtrl.push(AbookcontactPage, {"abid": abid, "cuid": objectId})  
  }
}
