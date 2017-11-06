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
  //notefolder = {name:'', nluid:''}
  constructor(
    public navCtrl: NavController, 
    public viewCtrl : ViewController,
    private notesService : NotesServiceProvider,
    private toastCtrl: ToastController,
  ) {
  }
  dismiss(){
    this.viewCtrl.dismiss()
  }
  updatefolder(){
    /*this.notesService.updateNotelist(this.notefolder.name, this.notefolder.nluid).then((result)=>{
      this.dismiss()
      this.presentToast()
    }, (err)=>{
      console.log("erreur "+err)
    })*/
  }
  presentToast(){
    let Toast = this.toastCtrl.create({
      message: 'Dossier créé',
      duration: 6000,
      position: 'center'
    })
    Toast.present()
  }
}
