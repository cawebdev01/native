import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Calendar } from '@ionic-native/calendar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Badge } from '@ionic-native/badge';

import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { LoginService } from '../../providers/login-service/login-service';

import { MailsFolders } from '../mails/mailsfolders/mailsfolders';
import { AbooksFolders} from '../abooks/abooksfolders/abooksfolders';
import { CalendarsFolders } from '../calendars/calendarsfolders/calendarsFolders';
import { StorageFolders } from '../storage/storagefolders/storagefolders';
import { NotesFolders } from '../notes/notesfolders/notesfolders';
import { TasksFolders } from '../tasks/tasksfolders/tasksfolders';
import { LoginPage } from '../login/login'; 
import { NewmailPage } from '../mails/newmail/newmail';
import { NeweventPage } from '../calendars/newevent/newevent';
import { NewnotePage } from '../notes/newnote/newnote'
import { NewtaskPage } from '../tasks/newtask/newtask'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	task; sessionid; url; email; password; testbg
	constructor(
		public navCtrl: NavController,
	//	private calendar: Calendar,
		private backgroundMode: BackgroundMode,
		private localnotification : LocalNotifications,
		private homeService : HomeServiceProvider,
		private loginService : LoginService,
		private badge : Badge,
	) {
		this.backgroundMode.enable();
		this.newMails();
		this.testbg = this.backgroundMode.isEnabled();
		if(this.testbg == 0){
			this.task = setInterval(() =>{
			this.newMails()
			}, 120000);
		
		}
		else{
			this.task =setInterval(()=>{
				this.newMails()
			}, 60000)
		}
		this.email = localStorage.getItem('email');
		this.url = localStorage.getItem('url');
		this.sessionid = localStorage.getItem('sessionid');
		this.password = localStorage.getItem('password');
		
	}
	public notif(){
		
		this.localnotification.schedule({
			id: 1,
			title : "test",
			text: "this is a test local"
		});
		this.localnotification.on("schedule", function(){} );
	}
	newMsg : number;
	public newMails(){
		this.homeService.getNewMails().subscribe(data =>{
			this.newMsg = data.msgNb;
			this.badge.set(this.newMsg);
			if(this.newMsg == 1){
				this.localnotification.schedule({
					id: 1,
					title : "Aruba mails",
					text: "vous avez un message"
				});
				this.localnotification.on("schedule", function(){/*console.log("ca marche!")*/} );
			}
			else if(this.newMsg > 1){
				this.localnotification.schedule({
					id: 1,
					title : "Aruba Mails",
					text: "Vous avez "+ this.newMsg +" messages",
					badge: this.newMsg
				});
				this.localnotification.on("schedule", function(){/*console.log("ca marche!")*/} );
			}
			else{
				this.localnotification.clear(1);
				this.badge.clear();
			}
		})
	}
	mails(){ 
		this.navCtrl.push(MailsFolders, {"folderid": "SU5CT1g="})
	}
	newmail(){
		this.navCtrl.push(NewmailPage)
	}
	contacts(){ 
		this.navCtrl.push(AbooksFolders)	
	}
	calendars(){ 
		this.navCtrl.push(CalendarsFolders)	
	}
	newevent(){
		this.navCtrl.push(NeweventPage)
	}
	storages(){ 
		this.navCtrl.push(StorageFolders)	
	}
	notes(){ 
		this.navCtrl.push(NotesFolders)	
	}
	tasks(){ 
		this.navCtrl.push(TasksFolders)			
	}
	newtask(){
		this.navCtrl.push(NewtaskPage)
	}
	newnote(){
		this.navCtrl.push(NewnotePage)
	}
	logout(){
		this.loginService.logout();
		localStorage.removeItem('sessionid')
		this.navCtrl.setRoot(LoginPage)
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
