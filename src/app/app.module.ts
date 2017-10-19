import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, /*Loading*/ } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MailsFolders } from '../pages/mails/mailsfolders/mailsfolders';
import { MailsinglePage } from '../pages/mails/mailsingle/mailsingle'; 
import { NewmailPage } from '../pages/mails/newmail/newmail';
import { AbooksFolders} from '../pages/abooks/abooksfolders/abooksfolders';
import { CalendarsFolders } from '../pages/calendars/calendarsfolders/calendarsFolders';
import { CalendardetailPage } from '../pages/calendars/calendardetail/calendardetail';
import { StorageFolders } from '../pages/storage/storagefolders/storagefolders';
import { StoragefilesPage} from '../pages/storage/storagefiles/storagefiles';
import { NotesFolders } from '../pages/notes/notesfolders/notesfolders';
import { TasksFolders } from '../pages/tasks/tasksfolders/tasksfolders';
import { TasksdetailsPage } from '../pages/tasks/tasksdetails/tasksdetails';
import { AbookslistPage } from '../pages/abooks/abookslist/abookslist';
import { NoteslistPage } from '../pages/notes/noteslist/noteslist';
import { NotedetailsPage } from '../pages/notes/notedetails/notedetails';
import { HomeServiceProvider } from '../providers/home-service/home-service';
import { LoginService } from '../providers/login-service/login-service';
import { Badge } from '@ionic-native/badge';
import { MailsServiceProvider } from '../providers/mails-service/mails-service';
import { AbooksService } from '../providers/abooks-service/abooks-service';
import { CalendarsServiceProvider } from '../providers/calendars-service/calendars-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { NotesServiceProvider } from '../providers/notes-service/notes-service';
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';
import { TasklistPage } from '../pages/tasks/tasklist/tasklist';
import { AbookcontactPage } from '../pages/abooks/abookcontact/abookcontact'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MailsFolders,
    MailsinglePage,
    NewmailPage,
    AbooksFolders,
    AbookcontactPage,
    AbookslistPage,
    CalendarsFolders,
    CalendardetailPage,
    StorageFolders,
    StoragefilesPage,
    NotesFolders,
    NoteslistPage,
    NotedetailsPage,
    TasksFolders,
    TasklistPage,
    TasksdetailsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MailsFolders,
    MailsinglePage,
    NewmailPage,
    AbooksFolders,
    AbookslistPage,
    AbookcontactPage,
    CalendarsFolders,
    CalendardetailPage,
    StorageFolders,
    StoragefilesPage,
    NotesFolders,
    NoteslistPage,
    NotedetailsPage,
    TasksFolders,
    TasklistPage,
    TasksdetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Calendar,
   // Loading,
  	BackgroundMode,
    LocalNotifications,
    Badge,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeServiceProvider,
    LoginService,
    MailsServiceProvider,
    AbooksService,
    CalendarsServiceProvider,
    StorageServiceProvider,
    NotesServiceProvider,
    TasksServiceProvider,
  ]
})
export class AppModule {}
