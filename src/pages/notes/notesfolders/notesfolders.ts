import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesServiceProvider } from '../../../providers/notes-service/notes-service'

@Component({
  selector: 'page-notesfolders',
  templateUrl: 'notesfolders.html',
})
export class NotesFolders {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private notesService: NotesServiceProvider,
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
}
