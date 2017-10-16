import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AbooksService } from '../../../providers/abooks-service/abooks-service'
import { AbookslistPage } from '../abookslist/abookslist'
/**
 * Generated class for the AbooksfoldersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-abooksfolders',
  templateUrl: 'abooksfolders.html',
})
export class AbooksFolders {
  public sessionid
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private abooksService: AbooksService,

  ) {
    this.sessionid = localStorage.getItem('sessionid')
    this.loadAbooks()
  }
  status; abid; objectNb; groups; abooks; 
  loadAbooks(){
    this.abooksService.getABList().subscribe(datas =>{
      this.status = datas.status,
      this.abid = datas.abid,
      this.objectNb = datas.objectNb,
      this.groups = datas.groups,
      this.abooks = datas.abooks
    })
  }
  contactslist(oid){
    this.navCtrl.push(AbookslistPage, {"oid": oid})
  }

}
