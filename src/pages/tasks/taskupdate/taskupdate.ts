import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'

@Component({
  selector: 'page-taskupdate',
  templateUrl: 'taskupdate.html',
})
export class TaskupdatePage {
  data; statusList; priorityList; tasklist; taskid;
  taskData = { edate:'', eday:'', emon:'', eyear:'',  name:'', objectId: Number, sdate: '', sday:'', smon:'', syear:'', percent: Number, priority: Number, status: '', tlid:'', tid:'', comment:''}
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private taskservice: TasksServiceProvider,
  ) {
    this.tasklist= this.navParams.get('tlid')
    this.taskid= this.navParams.get('tkid')
    this.contentloader()
    this.menuloader()
  }
  contentloader(){
    this.taskservice.getTaskdetail(this.tasklist, this.taskid).subscribe(task=>{
      this.taskData.name = task.data.label
      this.taskData.objectId = task.data.uid
      this.taskData.comment = task.data.comment
      this.taskData.percent = task.data.percent
      this.taskData.priority = task.data.priority
      this.taskData.status = task.data.state
      this.taskData.tlid = task.data.tasklistid
      if(task.data.sDate < 10){
        task.data.sDate = '0'+ task.data.sDate
      }
      if(task.data.sMonth < 10){
        task.data.sMonth = '0'+ task.data.sMonth
      }
      this.taskData.sdate = task.data.sYear+'-'+task.data.sMonth+'-'+task.data.sDate

      if(task.data.eDate < 10){
        task.data.eDate = '0'+ task.data.eDate
      }
      if(task.data.eMonth < 10){
        task.data.eMonth = '0'+ task.data.eMonth
      }
      this.taskData.edate = task.data.eYear+'-'+task.data.eMonth+'-'+task.data.eDate
      console.log(task.data)
    })
  }
  menuloader(){
    this.taskservice.getTasksList().subscribe(tasks=>{
      this.data = tasks.data
      this.statusList = tasks.statusList
      this.priorityList = tasks.priorityList
    })
  }
  cancel(){
    this.viewCtrl.dismiss()
  }
  edate_tmp; sdate_tmp;
  updatetask(){
    this.edate_tmp = this.taskData.edate.split('-')
    this.sdate_tmp = this.taskData.sdate.split('-')
    this.taskData.eday= this.edate_tmp[2]
    this.taskData.emon= this.edate_tmp[1]
    this.taskData.eyear = this.edate_tmp[0]
    this.taskData.sday= this.sdate_tmp[2]
    this.taskData.smon = this.sdate_tmp[1]
    this.taskData.syear = this.sdate_tmp[0]
    this.taskData.tid = this.taskid

    //console.log(this.taskData)
    this.taskservice.updatetask(this.taskData).then((result)=>{
      this.cancel()
    }, (err)=>{
      
    })
  }
}
