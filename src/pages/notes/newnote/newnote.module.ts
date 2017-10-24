import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewnotePage } from './newnote';

@NgModule({
  declarations: [
    NewnotePage,
  ],
  imports: [
    IonicPageModule.forChild(NewnotePage),
  ],
})
export class NewnotePageModule {}
