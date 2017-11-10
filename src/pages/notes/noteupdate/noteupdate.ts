import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NotesServiceProvider } from '../../../providers/notes-service/notes-service'

@Component({
  selector: 'page-noteupdate',
  templateUrl: 'noteupdate.html',
})
export class NoteupdatePage {
  noteData = {title:'', noteliste:'', content:'', nid:''}; nlid; nid; notelist;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private notesservice : NotesServiceProvider,
  ) {
    this.nlid = this.navParams.get('nlid')
    this.nid = this.navParams.get('nid')
    this.getlist()
    this.loader()
  }
  loader(){
    this.notesservice.getNote(this.nid, this.nlid).subscribe(note=>{
      this.noteData.title = note.name
      this.noteData.content = note.content
      this.noteData.noteliste = note.notelistid
    })
  }
  getlist(){
    this.notesservice.getNotesList().subscribe(notes => {
      this.notelist = notes.itemslists;
    })
  }
  cancel(){
    this.viewCtrl.dismiss()
  }
  updatenote(){
    //this.noteData.noteliste = this.nlid
    this.noteData.nid = this.nid
    console.log(this.noteData)
    this.notesservice.updateNote(this.noteData).then((result)=>{
      this.cancel()
    }, (err)=>{
      console.log("erreur "+err)
    })
  }
}
