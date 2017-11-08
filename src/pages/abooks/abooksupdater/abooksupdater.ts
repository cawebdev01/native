import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { AbooksService } from '../../../providers/abooks-service/abooks-service'

@Component({
  selector: 'page-abooksupdater',
  templateUrl: 'abooksupdater.html',
})
export class AbooksupdaterPage {
  @ViewChild(Content) content: Content;
  abook = {name:'', oid:''};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private Abooksservice: AbooksService,
  ) {
    this.abook.oid = this.navParams.get('oid')
    this.abook.name = this.navParams.get('name')
  }
  dismiss(){
    this.viewCtrl.dismiss();
  }  
  updname(){
   //console.log(this.abook)
   this.Abooksservice.updateList(this.abook).then((result)=>{
    console.log("update ok!")
   }, (err)=>{
    console.log("une erreur " + err)
   })
   this.viewCtrl.dismiss()
  }
}
   //this.abooksService.updateList(oid, name)