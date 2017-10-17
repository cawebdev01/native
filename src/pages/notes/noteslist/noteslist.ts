import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesServiceProvider } from '../../../providers/notes-service/notes-service';
import { NotedetailsPage } from '../notedetails/notedetails';

@Component({
  selector: 'page-noteslist',
  templateUrl: 'noteslist.html',
})
export class NoteslistPage {
notes ; 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private noteservice: NotesServiceProvider,
  ) {
    this.notes = navParams.get("nid")
    this.loadNotes()
  }
  page; data; 
  loadNotes(){
    this.noteservice.getNotes(this.notes).subscribe(notes =>{
      this.data = notes.data;
      this.page = notes.pageInfo
    })
  }
  notedetail(noteid){
  this.navCtrl.push(NotedetailsPage , {"noteid": noteid, "notegroup": this.notes})
  }

}
