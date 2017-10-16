import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'
@Component({
  selector: 'page-tasksfolders',
  templateUrl: 'tasksfolders.html',
})
export class TasksFolders {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private taskservice: TasksServiceProvider) {
      this.taskloader();
  }
  data;
  taskloader(){
    this.taskservice.getTasksList().subscribe(tasks=>{
      this.data = tasks.data
    })
  }
 
}
