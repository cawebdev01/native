import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { NotesServiceProvider } from '../../../providers/notes-service/notes-service';
import { NoteslistPage } from '../noteslist/noteslist';
import { NotefoldermodalePage } from '../notefoldermodale/notefoldermodale'
import { NotefolderupdatePage } from '../notefolderupdate/notefolderupdate'

@Component({
  selector: 'page-notesfolders',
  templateUrl: 'notesfolders.html',
})
export class NotesFolders {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private notesService: NotesServiceProvider,
    public alertCtrl: AlertController,  
  ) {
    this.loadNotesFolders()
  }
  datas; itemslists;
  loadNotesFolders(){
    this.notesService.getNotesList().subscribe(notes =>{
      this.datas = notes.data;
      this.itemslists = notes.itemslists;
    })
  }
  loadNotes(nid, label){
    this.navCtrl.push(NoteslistPage, {"nid": nid, "label": label})
  }
  newfolder(){
    let alert = this.alertCtrl.create({
      title: 'New folder',
      inputs:[{name: 'newfolder', placeholder: 'Name', type: 'text'}],
      buttons:[{ text: 'Cancel', role: 'cancel', handler: data =>{ }},
        {text: 'OK', handler: data => {
          this.notesService.createNotelist(data.newfolder).then((result)=>{
            this.loadNotesFolders()
          }, (err)=>{
            console.log("error " + err)
          })
        }
        }
      ]
    })
    alert.present()
  }
  editnotefolder(nid, fname){
    let alert = this.alertCtrl.create({
      title: 'Edit Notefolder',
      message : ' Enter the new Notefolder name?',
      inputs: [{name:'name', placeholder: fname, type: 'text'}], 
      buttons: [{text : 'Cancel', role: 'cancel', handler: data => { }}, 
      {text: 'Save', handler: data =>{
        this.notesService.updateNotelist(data.name, nid).then((result)=>{
          this.loadNotesFolders()
        }, (err)=>{})
      }}]
    })
    alert.present()
  }
  trashnotefolder(nid){
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure you want to delete this Notes folder and all contents ?',
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
            this.notesService.deleteNotelist(nid).then((result)=>{
              this.loadNotesFolders()
            }, (err)=>{
              console.log('error '+ err)
            })
          }
        }
      ]
    })
    alert.present()
  }
}
