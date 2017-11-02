import { Component } from '@angular/core';

import { MailsfolderlistPage } from '../mails/mailsfolderlist/mailsfolderlist' 
import { AbooksFolders} from '../abooks/abooksfolders/abooksfolders';
import { CalendarsFolders } from '../calendars/calendarsfolders/calendarsFolders';
import { StorageFolders } from '../storage/storagefolders/storagefolders';
import { NotesFolders } from '../notes/notesfolders/notesfolders';
import { TasksFolders } from '../tasks/tasksfolders/tasksfolders';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AbooksFolders;
  tab3Root = MailsfolderlistPage;
  tab4Root = CalendarsFolders;
  tab5Root = StorageFolders;
  tab6Root = NotesFolders;
  tab7Root = TasksFolders;
  
  constructor() {

  }
}
