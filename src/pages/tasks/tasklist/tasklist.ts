import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
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
  editTask(toid){
   /* let alert = this.alertCtrl.create({
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
            this.tasksservice.updatetask()
          
            ).then((result)=>{
              this.loadTasks()
            }, (err)=>{
            })
          }
        }
      ]
    })
    alert.present()*/
  }
}