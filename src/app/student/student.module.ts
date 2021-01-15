import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadBookComponent } from './download-book/download-book.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutStudentComponent } from './about-student/about-student.component';
import { StudentDictionaryComponent } from './student-dictionary/student-dictionary.component';
import { QuoteComponent } from './quote/quote.component';
import { GraphComponent } from './graph/graph.component';
import { LyricsComponent } from './lyrics/lyrics.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { SumaryComponent } from './sumary/sumary.component';
import { MapComponent } from './map/map.component';
import { NavBarStudentComponent } from './nav-bar-student/nav-bar-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalGraphComponent } from './graph/modal-graph/modal-graph.component';
import { NoBookSelectedComponent } from './no-book-selected/no-book-selected.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard-student', pathMatch: 'full' },
      { path: 'dashboard-student', component: AboutStudentComponent },
      { path: 'download', component: DownloadBookComponent },
      { path: 'vocabulary', component: StudentDictionaryComponent },
      { path: 'quotes', component: QuoteComponent },
      { path: 'graph', component: GraphComponent },
      { path: 'lyrics', component: LyricsComponent },
      { path: 'image', component: UploadImageComponent },
      { path: 'sumary', component: SumaryComponent },
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
    StudentDictionaryComponent,
    QuoteComponent,
    GraphComponent,
    LyricsComponent,
    UploadImageComponent,
    SumaryComponent,
    MapComponent,
    NavBarStudentComponent,
    ModalGraphComponent,
    NoBookSelectedComponent
  ],
  entryComponents: [ModalGraphComponent]
})
export class StudentModule {}
