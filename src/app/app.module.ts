import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Calendar } from '@ionic-native/calendar';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { FileOpener } from '@ionic-native/file-opener';
import { Toast } from '@ionic-native/toast';
import { NgCalendarModule } from 'ionic2-calendar'

import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { TaskupdatePage } from '../pages/tasks/taskupdate/taskupdate'
import { TaskgroupupdatePage } from '../pages/tasks/taskgroupupdate/taskgroupupdate'
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MailsFolders } from '../pages/mails/mailsfolders/mailsfolders';
import { MailsfolderlistPage } from '../pages/mails/mailsfolderlist/mailsfolderlist';
import { MailsinglePage } from '../pages/mails/mailsingle/mailsingle'; 
import { NewmailPage } from '../pages/mails/newmail/newmail';
import { NeweventPage } from '../pages/calendars/newevent/newevent';
import { AbooksFolders} from '../pages/abooks/abooksfolders/abooksfolders';
import { CalendarsFolders } from '../pages/calendars/calendarsfolders/calendarsFolders';
import { CalendardetailPage } from '../pages/calendars/calendardetail/calendardetail';
import { StorageFolders } from '../pages/storage/storagefolders/storagefolders';
import { StoragefilesPage } from '../pages/storage/storagefiles/storagefiles';
import { StoragedetailPage } from '../pages/storage/storagedetail/storagedetail'; 
import { NotesFolders } from '../pages/notes/notesfolders/notesfolders';
import { TasksFolders } from '../pages/tasks/tasksfolders/tasksfolders';
import { TasksdetailsPage } from '../pages/tasks/tasksdetails/tasksdetails';
import { ModaltaskPage } from '../pages/tasks/modaltask/modaltask';
import { ModalupdatetaskgroupPage } from '../pages/tasks/modaltask/modaltaskupdate'
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
import { NewnotePage } from '../pages/notes/newnote/newnote'
import { NewtaskPage } from '../pages/tasks/newtask/newtask'
//import { TabsPage } from '../pages/tabs/tabs'
import { NotefoldermodalePage } from '../pages/notes/notefoldermodale/notefoldermodale'
import { NotefolderupdatePage } from '../pages/notes/notefolderupdate/notefolderupdate'
import { NoteupdatePage } from '../pages/notes/noteupdate/noteupdate'

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    LoginPage,
    MailsFolders,
    MailsfolderlistPage,
    MailsinglePage,
    ModaltaskPage,
    ModalupdatetaskgroupPage,
    NewmailPage,
    AbooksFolders,
    AbookcontactPage,
    AbookslistPage,
    CalendarsFolders,
    CalendardetailPage,
    NeweventPage,
    NewnotePage,
    NotefoldermodalePage,
    NotefolderupdatePage,
    NewtaskPage,
    StorageFolders,
    StoragefilesPage,
    StoragedetailPage,
    NotesFolders,
    NoteslistPage,
    NotedetailsPage,
    NoteupdatePage,
    TasksFolders,
    TasklistPage,
    TasksdetailsPage,
    //TabsPage,
    TaskupdatePage ,
    TaskgroupupdatePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    LoginPage,
    MailsFolders,
    MailsfolderlistPage,
    MailsinglePage,
    ModaltaskPage,
    ModalupdatetaskgroupPage,
    NewmailPage,
    NewnotePage,
    NewtaskPage,
    NotefoldermodalePage,
    AbooksFolders,
    AbookslistPage,
    AbookcontactPage,
    CalendarsFolders,
    CalendardetailPage,
    NeweventPage,
    StorageFolders,
    StoragefilesPage,
    StoragedetailPage,
    NotesFolders,
    NoteslistPage,
    NotedetailsPage,
    NoteupdatePage,
    NotefolderupdatePage,
    TasksFolders,
    TasklistPage,
    TasksdetailsPage,
    //TabsPage,
    TaskupdatePage ,
    TaskgroupupdatePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Calendar,
    LoadingController,
    BackgroundMode,
    FileOpener,
    Toast,
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
