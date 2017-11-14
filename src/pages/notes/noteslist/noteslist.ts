import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { NotesServiceProvider } from '../../../providers/notes-service/notes-service';
import { NotedetailsPage } from '../notedetails/notedetails';
import { NoteupdatePage } from '../noteupdate/noteupdate'
import { NewnotePage } from '../newnote/newnote'

@Component({
  selector: 'page-noteslist',
  templateUrl: 'noteslist.html',
})
export class NoteslistPage {
notes ; title
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private noteservice: NotesServiceProvider,
  ) {
    this.notes = navParams.get("nid")
    this.title = navParams.get("label")
    this.loadNotes()
  }
  page; data; 
  loadNotes(){
    this.noteservice.getNotes(this.notes).subscribe(notes =>{
      this.data = notes.data;
      this.page = notes.pageInfo
    })
  }
  newnote(){
    let modal = this.modalCtrl.create(NewnotePage)
    modal.onDidDismiss(()=>{
      this.loadNotes()
    })
    modal.present()
  }
  notedetail(noteid){
    this.navCtrl.push(NotedetailsPage , {"noteid": noteid, "notegroup": this.notes})
  }
  editnote(noteid){
    let modal = this.modalCtrl.create(NoteupdatePage, {'nid':noteid, 'nlid':this.notes})
    modal.onDidDismiss(()=>{
      this.loadNotes()
    })
    modal.present()
  }
  trashnote(noteid){
    let alert = this.alertCtrl.create({
      title: 'Delete Task',
      message : ' Are you sure to want to delete this task?',
      buttons: [
        {
          text : 'Cancel', 
          role: 'cancel',
          handler: ()=> {
            console.log('Cancel clicked')
          }
        }, {
          text: 'Delete',
          handler: ()=>{
            this.noteservice.deleteNote(this.notes, noteid).then((result)=>{
              this.loadNotes()
            }, (err)=>{
            })
          }
        }
      ]
    })
    alert.present()
  }
  nxp; length
  nextpage(infiniteScroll){
    this.page.page = this.page.page+1
    setTimeout(()=>{
      this.noteservice.getNextpage(this.notes, this.page.page)
      .subscribe( notes =>{
        this.data = notes.data;
        this.page = notes.pageInfo;
        this.nxp = notes.pageInfo.nextPage;
        this.length = notes.data.length;
        for(let i=0; i< this.length; i++){
          this.notes.push(this.data.data[i])
        }
      })
      infiniteScroll.complete()
    }, 1000)
  }
}
