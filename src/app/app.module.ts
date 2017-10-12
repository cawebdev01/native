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
import { AbooksFolders} from '../pages/abooks/abooksfolders/abooksfolders';
import { CalendarsFolders } from '../pages/calendars/calendarsfolders/calendarsFolders';
import { StorageFolders } from '../pages/storage/storagefolders/storagefolders';
import { NotesFolders } from '../pages/notes/notesfolders/notesfolders';
import { TasksFolders } from '../pages/tasks/tasksfolders/tasksfolders';

import { HomeServiceProvider } from '../providers/home-service/home-service';
import { LoginService } from '../providers/login-service/login-service';
import { Badge } from '@ionic-native/badge';
import { MailsServiceProvider } from '../providers/mails-service/mails-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MailsFolders,
    MailsinglePage,
    AbooksFolders,
    CalendarsFolders,
    StorageFolders,
    NotesFolders,
    TasksFolders,
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
    AbooksFolders,
    CalendarsFolders,
    StorageFolders,
    NotesFolders,
    TasksFolders,
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
  ]
})
export class AppModule {}
