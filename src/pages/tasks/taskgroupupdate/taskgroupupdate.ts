import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'

@Component({
  selector: 'page-taskgroupupdate',
  templateUrl: 'taskgroupupdate.html',
})
export class TaskgroupupdatePage {
  taskfolder = { name: '', tid:''};
  folder; tid
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private taskservice : TasksServiceProvider,
  ) {
    this.taskfolder.tid = navParams.get('tid');
    this.taskfolder.name = navParams.get('folder');
    }
  dismiss(){
    this.viewCtrl.dismiss()
  }
  update(){
    console.log(this.taskfolder)
    this.taskservice.updateGroup(this.taskfolder).then((result)=>{
      console.log("update done")
    }, (err)=>{
      console.log("err " + err)
    })
    this.viewCtrl.dismiss()
  }

}
