import { Component } from '@angular/core';


import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { LoginService } from '../../providers/login-service/login-service';

import { MailsFolders } from '../mails/mailsfolders/mailsfolders';
import { MailsfolderlistPage } from '../mails/mailsfolderlist/mailsfolderlist' 
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
import { HomePage } from '../home/home'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MailsfolderlistPage;
  tab3Root = AbooksFolders;
  tab4Root = CalendarsFolders;
  tab5Root = TasksFolders;
  tab6Root = StorageFolders;
  tab7Root = NotesFolders
  constructor() {
  }
}
