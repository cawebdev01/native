import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { AbooksService } from '../../../providers/abooks-service/abooks-service'

@Component({
  selector: 'page-abookcreator',
  templateUrl: 'abookcreator.html',
})
export class AbookcreatorPage {
  abook = {name:''}
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private abookservice: AbooksService,
  ) {
  }
  dismiss(){
    this.viewCtrl.dismiss()
  }
  newfolder(){
    //console.log(this.abook)
    this.abookservice.createList(this.abook.name).then((result)=>{
      console.log("Ok c'est créé!")
      this.dismiss()
    }, (err)=>{
      console.log("erreur "+err)
    })
  }
}
