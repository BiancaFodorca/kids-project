import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadBookComponent } from './download-book/download-book.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutStudentComponent } from './about-student/about-student.component';

import { DailyHelloComponent } from './daily-hello/daily-hello.component';
import { PresenceComponent } from './graph/presence.component';
import { VideoComponent } from './video/video.component';
import { RiddleComponent } from './riddle/riddle.component';
import { TodayImportanceComponent } from './today-importance/today-importance.component';
import { MapComponent } from './map/map.component';
import { NavBarStudentComponent } from './nav-bar-student/nav-bar-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPresenceComponent } from './graph/modal-presence/modal-presence.component';
import { NoBookSelectedComponent } from './no-book-selected/no-book-selected.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SafePipe } from './safe.pipe';
import { CalendarComponent } from './calendar/calendar.component';
import { SmartKidsComponent } from './smart-kids/smart-kids.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard-student', pathMatch: 'full' },
      { path: 'dashboard-student', component: AboutStudentComponent },
      { path: 'download', component: DownloadBookComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'daily-hello', component: DailyHelloComponent },
      { path: 'presence', component: PresenceComponent },
      { path: 'video', component: VideoComponent },
      { path: 'smart-kids', component: SmartKidsComponent },
      { path: 'riddle', component: RiddleComponent },
      { path: 'today-importance', component: TodayImportanceComponent },
      { path: 'map', component: MapComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    DownloadBookComponent,
    DashboardComponent,
    AboutStudentComponent,
    CalendarComponent,
    DailyHelloComponent,
    PresenceComponent,
    VideoComponent,
    RiddleComponent,
    TodayImportanceComponent,
    MapComponent,
    SmartKidsComponent,
    NavBarStudentComponent,
    ModalPresenceComponent,
    NoBookSelectedComponent,
    SafePipe,
  ],
  entryComponents: [ModalPresenceComponent]
})
export class StudentModule {}
