import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'

@Component({
  selector: 'page-newtask',
  templateUrl: 'newtask.html',
})
export class NewtaskPage {
  statusList; priorityList; data;
  taskData = {}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private taskservice : TasksServiceProvider,
  ) {
    this.taskloader()
    console.log(this.priorityList)
  }
  taskloader(){
    this.taskservice.getTasksList().subscribe(tasks=>{
      this.data = tasks.data
      this.statusList = tasks.statusList
      this.priorityList = tasks.priorityList
      //console.log(this.priorityList)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewtaskPage');
  }
  createtask(){
    console.log("task crée!")
    /*this.taskservice.postTask(this.taskData).then((result)=>{

    }, (err)=>{

    })*/
  }

}
