import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesServiceProvider } from '../../../providers/notes-service/notes-service';

@Component({
  selector: 'page-notedetails',
  templateUrl: 'notedetails.html',
})
export class NotedetailsPage {
noteid; notegroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private noteservice: NotesServiceProvider,
  ) {
    this.notegroup = navParams.get("notegroup");
    this.noteid = navParams.get("noteid");
    this.getnote()
  }
  status; edit; uid; ishtml; cDate; mDate; name; content;
  getnote(){
    this.noteservice.getNote(this.noteid, this.notegroup).subscribe(note =>{
      this.status = note.status;
      this.edit = note.edit;
      this.uid = note.uid;
      this.ishtml = note.isHTML;
      this.cDate = note.cDate;
      this.mDate = note.mDate;
      this.name = note.name;
      this.content = note.content;
    })
  }

  
}
