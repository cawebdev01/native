import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
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
    public viewCtrl: ViewController,
    private noteservice : NotesServiceProvider,
  ) {
    this.getlist()
  }
  getlist(){
    this.noteservice.getNotesList().subscribe(notes => {
      this.notelist = notes.itemslists;
    })
  }
  cancel(){
    this.viewCtrl.dismiss()
  }
  createnote(){
    console.log(this.noteData)
    this.noteservice.createNote(this.noteData).then((result)=>{
      this.cancel()
    }, (err)=>{
      console.log("erreur " + err)
    })
  }
}
