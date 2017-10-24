import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, } from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'

@Component({
  selector: 'page-newtask',
  templateUrl: 'newtask.html',
})
export class NewtaskPage {
  statusList; priorityList; data;title; rawedate; rawsdate;
  priority; status;
  taskData = {name:'', sdate:'', tlid:'', sday:'', smonth:'', syear:'', edate:'', eday:'', emonth:'', eyear:'', comment:'', status:'', percent:'', priority:''}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private taskservice : TasksServiceProvider,
    private toastCtrl : ToastController,
  ) {
    this.title = "Création task"
    this.taskloader()
  }
  taskloader(){
    this.taskservice.getTasksList().subscribe(tasks=>{
      this.data = tasks.data
      this.statusList = tasks.statusList
      this.priorityList = tasks.priorityList
      //console.log(this.priorityList)
    })
  }
  createtask(){
    this.rawedate = this.taskData.edate.split("-")
    this.rawsdate = this.taskData.sdate.split("-")
    this.taskData.eday = this.rawedate[2]
    this.taskData.emonth = this.rawedate[1]
    this.taskData.eyear = this.rawedate[0]
    this.taskData.sday = this.rawsdate[2]
    this.taskData.smonth = this.rawsdate[1]
    this.taskData.syear = this.rawsdate[0]
   
    console.log(this.taskData);
    
    this.taskservice.postTask(this.taskData).then((result)=>{
      this.navCtrl.getPrevious()
    }, (err)=>{
      console.log("erreur" + err)
    })
  }

}
