import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { SmartKidsService } from './smart-kids.service';
import { AuthService } from './auth/auth.service';
import { TodayImportanceService } from './shared/services/today-importance/today-importance-service.service';
import { RiddleService } from './shared/services/riddle/riddle.service';
import { SharedModule } from './shared/shared.module';
import { ResponsesService } from './shared/services/responses/responses.service';
import { LocalStorageService } from './shared/services/localStorage/local-storage.service';
import { QuestionService } from './shared/services/questions/question.service';
import { UsersService } from './shared/services/users/users.service';
import { EmotionsService } from './shared/services/emotions/emotions.service';
import { UploadPhotoService } from './shared/services/upload-photo/upload-photo.service';
import { NotifierModule } from 'angular-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { PresenceService } from './shared/services/presence/presence.service';
import { DailyHelloService } from './shared/services/daily-hello/daily-hello.service';
import { VideoService } from './shared/services/video/video.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./teacher/teacher.module').then(m => m.TeacherModule)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StudentModule,
    TeacherModule,
    AuthModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    Angular2FontawesomeModule,
    NgbModule.forRoot(),
    SharedModule,
    NotifierModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    AuthService,
    LocalStorageService,
    SmartKidsService,
    ResponsesService,
    TodayImportanceService,
    RiddleService,
    QuestionService,
    UsersService,
    EmotionsService,
    UploadPhotoService,
    // TODO: this must remain
    PresenceService,
    DailyHelloService,
    VideoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
