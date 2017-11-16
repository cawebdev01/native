import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'

import { TasksdetailsPage } from '../tasksdetails/tasksdetails';
import { NewtaskPage } from '../newtask/newtask'
import { TaskupdatePage } from '../taskupdate/taskupdate'

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html',
})
export class TasklistPage {
  tid; title
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private tasksservice: TasksServiceProvider,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
  ) {
    this.tid = navParams.get("tid");
    this.title = this.navParams.get("name")
    this.loadTasks()
  }
data; pages
  loadTasks(){
    this.tasksservice.getTasks(this.tid).subscribe(tasks =>{
      this.data = tasks.data;
      this.pages = tasks.pageInfo;
    })
  }
  openTask(taskid){
    this.navCtrl.push(TasksdetailsPage, {"list": this.tid, "tid": taskid})
  }
  deleteTask(toid){
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
            this.tasksservice.deletetask(this.tid, toid).then((result)=>{
              this.loadTasks()
            }, (err)=>{
            })
          }
        }
      ]
    })
    alert.present()
  }
  newtask(){
    let myModal = this.modalCtrl.create(NewtaskPage)
    myModal.onDidDismiss(()=>{
      this.loadTasks()
    })
    myModal.present()
  }
  editTask(obj){
    let myModal = this.modalCtrl.create(TaskupdatePage,{'tlid': this.tid, 'tkid': obj})
    myModal.onDidDismiss(()=>{
      this.loadTasks()
    })
    myModal.present() 
    console.log (this.tid, obj)
  }
  nxp; length
  /*nextpage(infiniteScroll){
    this.pages.page = this.pages.page+1
    setTimeout(()=>{
      this.tasksservice.g(this.notes, this.page.page)
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
  }*/
}