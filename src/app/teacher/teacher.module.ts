import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadBookComponent } from './upload-book/upload-book.component';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { DashboardTeacherComponent } from './dashboard-teacher/dashboard-teacher.component';
import { QuestionsComponent } from './questions/questions.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NavBarTeacherComponent } from './nav-bar-teacher/nav-bar-teacher.component';
import { AboutTeacherComponent } from './about-teacher/about-teacher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteWordComponent } from './dictionary/delete-word/delete-word.component';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ImportantDayComponent } from './important-day/important-day.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardTeacherComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AboutTeacherComponent },
      { path: 'upload', component: UploadBookComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'dictionary', component: DictionaryComponent },
      { path: 'important-day', component: ImportantDayComponent },
      { path: 'newaccount', component: CreateAccountComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbPaginationModule,
    NgbModule,
    HttpClientModule,
    SimpleNotificationsModule
  ],
  declarations: [
    UploadBookComponent,
    TeacherComponent,
    DashboardTeacherComponent,
    QuestionsComponent,
    StatisticsComponent,
    NavBarTeacherComponent,
    AboutTeacherComponent,
    CreateAccountComponent,
    DictionaryComponent,
    DeleteWordComponent,
    ImportantDayComponent
  ],
  exports: [RouterModule],
  entryComponents: [DeleteWordComponent]
})
export class TeacherModule {}
