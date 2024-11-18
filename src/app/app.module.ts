import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import {
  CdkDrag,
  CdkDropList,
  DragDropModule,

} from "@angular/cdk/drag-drop";
import {FormsModule} from "@angular/forms";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkDropList,
    DragDropModule,
    CdkDrag,
    CdkDropList,
    FormsModule,


  ],
  providers: []
})
export class AppModule { }
