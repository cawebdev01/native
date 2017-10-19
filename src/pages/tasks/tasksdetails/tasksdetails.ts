import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service';


@Component({
  selector: 'page-tasksdetails',
  templateUrl: 'tasksdetails.html',
})
export class TasksdetailsPage {
  taskslist; tid;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private tasksservice: TasksServiceProvider,
  ) {
    this.taskslist = navParams.get("list");
    this.tid = navParams.get("tid");
    this.loadTaskdetail();
  }
  status; data; label; comment; percent; 
  loadTaskdetail(){
    this.tasksservice.getTaskdetail(this.taskslist, this.tid).subscribe(task=>{
      this.status = task.status;
      this.label = task.data.label;
      this.comment = task.data.comment;
      this.percent = task.data.percent;
    })
  }
}
