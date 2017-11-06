import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, Content, ToastController } from 'ionic-angular';
import { NotesServiceProvider } from '../../../providers/notes-service/notes-service'

@Component({
  selector: 'page-notefoldermodale',
  templateUrl: 'notefoldermodale.html',
})
export class NotefoldermodalePage {
  @ViewChild(Content) content: Content;
  notelist = {name:''}
  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    private notesservice : NotesServiceProvider,
  ) {
  }
  dismiss(){
    this.viewCtrl.dismiss()
  }
  newdossier(){
    this.notesservice.createNotelist(this.notelist.name).then((result)=>{
      this.dismiss()
      this.presentToast()
    }, (err)=>{
      console.log("erreur "+err)
    })
  }
  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Dossier Créé',
      duration: 5000,
      position : 'center'
    })
    toast.present()
  }
}
