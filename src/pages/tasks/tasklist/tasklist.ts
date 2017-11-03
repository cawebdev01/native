import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'
import { TasksdetailsPage } from '../tasksdetails/tasksdetails';

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html',
})
export class TasklistPage {
  tid
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private tasksservice: TasksServiceProvider,
  ) {
    this.tid = navParams.get("tid");
    this.loadTasks()
  }
data
  loadTasks(){
    this.tasksservice.getTasks(this.tid).subscribe(tasks =>{
      this.data = tasks.data;
    })
  }
  openTask(taskid){
    this.navCtrl.push(TasksdetailsPage, {"list": this.tid, "tid": taskid})
  }
  deleteTask(toid){
    this.tasksservice.deletetask(this.tid, toid).then((result)=>{
      console.log("task supprimé")
    }, (err)=>{
      console.log("erre lors de la suppression")
    })
  }
}
