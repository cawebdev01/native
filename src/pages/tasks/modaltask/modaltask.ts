import { Component } from '@angular/core';
import { NavController, NavParams , ViewController} from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'
import { TasksFolders } from '../tasksfolders/tasksfolders'
@Component({
    templateUrl: 'modaltask.html'
})
export class ModaltaskPage{
    tasklist ={name:''};
    constructor(
        public navCtrl: NavController,
        public viewCtrl : ViewController,
        private taskservice : TasksServiceProvider,
    ){

    }
    dismiss(){
        this.viewCtrl.dismiss();
    }
    newdossier(){
        console.log(this.tasklist.name)
        this.taskservice.taskList(this.tasklist.name).then((result)=>{
            this.dismiss()
            this.navCtrl.push(TasksFolders)
        }, (err)=>{
            console.log("erreur "+err)
        })
    }
}