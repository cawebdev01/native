import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AbooksService } from '../../../providers/abooks-service/abooks-service'
import { AbookcontactPage } from '../abookcontact/abookcontact';
import { NewcontactPage } from '../newcontact/newcontact'

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

  contacts; pageinfo
  loadABContent(){
    this.abooksService.getABContent(this.oid).subscribe(content =>{
      this.contacts = content.data
      this.pageinfo = content.pageInfo
    })
  }
  newcontact(){
    this.navCtrl.push( NewcontactPage )
  }
  contactdetail(objectId, abid){
    this.navCtrl.push(AbookcontactPage, {"abid": abid, "cuid": objectId})  
  }
  nxp; data; length; cdata
  nextpage(infiniteScroll){
    this.pageinfo.page = this.pageinfo.page+1
    setTimeout(() => {
      this.abooksService.getnextpage(this.oid)
      .subscribe(
        content => {
          this.cdata = content.data;
          this.pageinfo = content.pageInfo;
          this.nxp = content.pageInfo.nextPage
          this.length = content.data.length;
          for(let i=0; i < this.length; i++){
            this.contacts.push(this.cdata[i])
          }
        }
      )
      infiniteScroll.complete()
    }, 1000)
  }
}
