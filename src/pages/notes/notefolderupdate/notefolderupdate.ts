import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { ToastController } from 'ionic-angular'
import { NotesServiceProvider } from '../../../providers/notes-service/notes-service'

@Component({
  selector: 'page-notefolderupdate',
  templateUrl: 'notefolderupdate.html',
})
export class NotefolderupdatePage {
  @ViewChild(Content) content: Content;
  notefolder = {name:'', nluid:''}
  name; nluid;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl : ViewController,
    private notesService : NotesServiceProvider,
    private toastCtrl: ToastController,
  ) {
    this.notefolder.nluid = navParams.get('nid')
    this.notefolder.name = navParams.get('folder')
  }
  dismiss(){
    this.viewCtrl.dismiss()
  }
  updatefolder(){
    this.notesService.updateNotelist(this.notefolder.name, this.notefolder.nluid).then((result)=>{
      this.dismiss()
      this.presentToast("modifié")
    }, (err)=>{
      console.log("erreur "+err)
    })
  }
  presentToast(msg){
    let Toast = this.toastCtrl.create({
      message: 'Dossier '+msg,
      duration: 6000,
      position: 'center'
    })
    Toast.present()
  }
}
