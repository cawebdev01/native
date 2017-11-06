import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

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
    public modalCtrl: ModalController,  
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
    let Modal = this.modalCtrl.create(NotefoldermodalePage)
    Modal.present()
  }
  editnotefolder(nid, fname){
    let Modal = this.modalCtrl.create(NotefolderupdatePage, { "nid":nid, "folder": fname})
    Modal.present()
  }
  trashnotefolder(nid){
    this.notesService.deleteNotelist(nid)
  }
}
