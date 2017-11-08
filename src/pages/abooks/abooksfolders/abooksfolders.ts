import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AbooksService } from '../../../providers/abooks-service/abooks-service'
import { AbookslistPage } from '../abookslist/abookslist'
import { AbooksupdaterPage } from '../abooksupdater/abooksupdater'
import { AbookcreatorPage } from '../abookcreator/abookcreator'

@Component({
  selector: 'page-abooksfolders',
  templateUrl: 'abooksfolders.html',
})

export class AbooksFolders {
  public sessionid
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private alerteCtrl: AlertController,
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
  credential = {name:'', oid:''}
  editlistname(oid, oldname){
    /*let myModal = this.modalCtrl.create(AbooksupdaterPage, {"oid": oid, "name": name})
    myModal.present()*/
    let alert = this.alerteCtrl.create({
      title: 'Update',
      message: 'Enter the new Abook name',
      inputs: [
        {
          name:'newname',
          placeholder: oldname,
          type: 'text'
        }
      ],
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data =>{
            //console.log('Cancel clicked')
          }
        },
        {
          text: 'OK',
          handler: data =>{
            this.credential = { name: data.newname, oid: oid}
            console.log(this.credential)
            this.abooksService.updateList(this.credential).then((result)=>{
              this.loadAbooks()
            }, (err)=>{
              console.log("erreur "+ err)
            })
          }
        }
      ]
    })
    alert.present()
  }
  deleteabook(oid){
    let alert = this.alerteCtrl.create({
      title: 'Delete',
      message: 'Are you sure you want to delete this abook and all contents ?',
      buttons: [
        {
          text : 'Cancel', 
          role: 'cancel',
          handler: ()=> {
            console.log('Cancel clicked')
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked')
            this.abooksService.deleteList(oid).then((result)=>{
              this.loadAbooks()
            }, (err)=>{
              console.log("erreur "+ err)
            })
          }
        }
      ] 
    })
    alert.present()
  }
  newfolder(){
    let myModal = this.modalCtrl.create(AbookcreatorPage)
    myModal.present()
  }
}
