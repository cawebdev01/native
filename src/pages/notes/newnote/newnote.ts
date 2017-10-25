import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotesServiceProvider } from '../../../providers/notes-service/notes-service'

@Component({
  selector: 'page-newnote',
  templateUrl: 'newnote.html',
})
export class NewnotePage {
  noteData = {title:'', noteliste:'', content:''}; notelist;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private noteservice : NotesServiceProvider,
  ) {
    this.getlist()
  }
  getlist(){
    this.noteservice.getNotesList().subscribe(notes => {
      this.notelist = notes.itemslists;
    })
  }
  createnote(){
      console.log(this.noteData)
  }
}
