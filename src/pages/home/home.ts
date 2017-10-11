import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Calendar } from '@ionic-native/calendar';
//import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { HomeServiceProvider } from '../../providers/home-service/home-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	task
	constructor(
		public navCtrl: NavController,
	//	private calendar: Calendar,
	//	private backgroundMode: BackgroundMode,
		private localnotification : LocalNotifications,
		private homeService : HomeServiceProvider,
	) {
		//this.backgroundMode.enable()
		//this.notif();
		this.task = setInterval(() =>{
			this.newMails()
		}, 60000)
	}
	public notif(){
		
		this.localnotification.schedule({
			id: 1,
			title : "test",
			text: "this is a test local"
		});
		this.localnotification.on("schedule", function(){/*console.log("ca marche!")*/} );
	}
	newMsg : number;
	public newMails(){
		this.homeService.getNewMails().subscribe(data =>{
			this.newMsg = data.msgNb;
			if(this.newMsg == 1){
				this.localnotification.schedule({
					id: 1,
					title : "Aruba mails",
					text: "vous avez un message"
				});
				this.localnotification.on("schedule", function(){/*console.log("ca marche!")*/} );
			}
			if(this.newMsg > 1){
				this.localnotification.schedule({
					id: 1,
					title : "Aruba Mails",
					text: "Vous avez "+ this.newMsg +" messages"
				});
				this.localnotification.on("schedule", function(){/*console.log("ca marche!")*/} );
			}
			else{
				this.localnotification.clear(1)
			}
		})
	}
	/*public tobg(){
		this.backgroundMode.moveToBackground();
		console.log(this.backgroundMode.isActive());
	}
	public tofg(){
		this.backgroundMode.moveToForeground();
		console.log(this.backgroundMode.isActive());
	}
	this.calendar.createCalendar('MyCalendar').then(
		(msg) => { console.log(msg);},
		(err) => { console.log(err);}
	);*/
}
