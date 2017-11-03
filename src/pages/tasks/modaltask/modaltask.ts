import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams , ViewController, Content} from 'ionic-angular';
import { TasksServiceProvider } from '../../../providers/tasks-service/tasks-service'
import { TasksFolders } from '../tasksfolders/tasksfolders'
import { ToastController } from 'ionic-angular'

@Component({
    templateUrl: 'modaltask.html'
})
export class ModaltaskPage{
    @ViewChild(Content) content: Content;
    tasklist ={name:''};
    constructor(
        public navCtrl: NavController,
        public viewCtrl : ViewController,
        private taskservice : TasksServiceProvider,
        private toastCtrl : ToastController,
    ){

    }
    dismiss(){
        this.viewCtrl.dismiss();
    }
    newdossier(){
        console.log(this.tasklist.name)
        this.taskservice.taskList(this.tasklist.name).then((result)=>{
            this.dismiss()
            this.presentToast()
            //this.content.resize()
           // this.navCtrl.push(TasksFolders)
        }, (err)=>{
            console.log("erreur "+err)
        })
    }
    presentToast(){
        let toast = this.toastCtrl.create({
            message: 'Dossier créé',
            duration: 5000,
            position: 'center'
        })
        toast.present()
    }
}