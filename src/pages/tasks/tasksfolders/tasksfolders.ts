import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { Refresher } from 'ionic-angular/components/refresher/refresher'
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'
import { TasklistPage } from '../tasklist/tasklist';

//import { ModaltaskPage } from '../modaltask/modaltask'
//import { ModalupdatetaskgroupPage } from '../modaltask/modaltaskupdate'
//import { TaskgroupupdatePage } from '../taskgroupupdate/taskgroupupdate'
@Component({
  selector: 'page-tasksfolders',
  templateUrl: 'tasksfolders.html',
})
export class TasksFolders {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController, 
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
    /*let myModal = this.modalCtrl.create(ModaltaskPage);
    myModal.present();*/
    let alert = this.alertCtrl.create({
      title: 'New folder',
      inputs:[{name: 'newfolder', placeholder: 'Name', type: 'text'}],
      buttons:[{ text: 'Cancel', role: 'cancel', handler: data =>{ }},
        {text: 'OK', handler: data => {
          this.taskservice.taskList(data.newfolder).then((result)=>{
            this.taskloader()
          }, (err)=>{
            console.log("error " + err)
          })
        }
        }
      ]
    })
    alert.present()
  }
  edittaskfolder(tid, folder){
    /*let myModal = this.modalCtrl.create(TaskgroupupdatePage, {"tid":tid, "folder":folder})
    myModal.present()*/
    //this.taskservice.updateGroup(tid)
  }
  trashtaskfolder(tid){
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure you want to delete this TaskList and all contents ?',
      buttons: [
        {
          text : 'Cancel', 
          role: 'cancel',
          handler: ()=> {
            console.log('Cancel clicked')
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked')
            this.taskservice.deleteGroup(tid).then((result)=>{
              this.taskloader()
            }, (err)=>{
              console.log("erreur "+ err)
            })
          }
        }
      ] 
    })
    alert.present()
    //this.taskservice.deleteGroup(tid)
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
