import { Component } from '@angular/core';
import { NavController, NavParams , ModalController} from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'
import { TasklistPage } from '../tasklist/tasklist';

import { ModaltaskPage } from '../modaltask/modaltask'
import { ModalupdatetaskgroupPage } from '../modaltask/modaltaskupdate'
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
  edittaskfolder(tid){
    let myModal = this.modalCtrl.create(ModalupdatetaskgroupPage);
    myModal.present()
    //this.taskservice.updateGroup(tid)
  }
  trashtaskfolder(tid){
    this.taskservice.deleteGroup(tid)
  }
}
