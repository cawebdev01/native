import { Component } from '@angular/core';
import { NavController, NavParams , ModalController} from 'ionic-angular';
import { Refresher } from 'ionic-angular/components/refresher/refresher'
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'
import { TasklistPage } from '../tasklist/tasklist';

import { ModaltaskPage } from '../modaltask/modaltask'
//import { ModalupdatetaskgroupPage } from '../modaltask/modaltaskupdate'
import { TaskgroupupdatePage } from '../taskgroupupdate/taskgroupupdate'
@Component({
  selector: 'page-tasksfolders',
  templateUrl: 'tasksfolders.html',
})
export class TasksFolders {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController, 
    private taskservice: TasksServiceProvider) {
      this.taskloader();
  }
  data;
  taskloader(){
    this.taskservice.getTasksList().subscribe(tasks=>{
      this.data = tasks.data
    })
  }
  tasks;
  gettasks(tid){
   this.navCtrl.push(TasklistPage, {"tid": tid})
  }
  newfolder(){
    let myModal = this.modalCtrl.create(ModaltaskPage);
    myModal.present();
  }
  edittaskfolder(tid, folder){
    let myModal = this.modalCtrl.create(TaskgroupupdatePage, {"tid":tid, "folder":folder})
    myModal.present()
    //this.taskservice.updateGroup(tid)
  }
  trashtaskfolder(tid){
    this.taskservice.deleteGroup(tid)
    //this.doRefresh

  }
  doRefresh(refresher: Refresher){
    //let refresher: Refresher
    this.taskservice.getTasksList().subscribe(tasks=>{
      this.data = tasks.data
      refresher.complete()
    })
  }
  doPulling(refresher:Refresher){
    console.log('Pulling', refresher.progress)
  }
  
}
