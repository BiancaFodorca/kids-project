import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../shared/services/questions/question.service';
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { PresenceService } from '../../shared/services/presence/presence.service';
import { VideoService } from '../../shared/services/video/video.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  number = {
    numberOfKids: 0,
    id: 0
  };
  numberOfKidsEditable;
  currentYear = 2021;
  currentYearEditable;
  videoUrl = "";
  videoId = 0;
  videoUrlEditable;
  isKidsNumberEditable = true;
  isYearEditable = true;
  isLinkEditable = true;
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    public sanitizer:DomSanitizer,
    private _service: NotificationsService,
    private presenceService: PresenceService,
    private videoService: VideoService
  ) {
    this.getAllInfo();
  }

  ngOnInit() {}

  getAllInfo() {
    this.getCurrentNumberOfKids();
    this.getVideo();
  }

  getVideo() {
    this.videoService.getAllVideos().subscribe(resp => {
      const response = JSON.parse(resp._body);
      
      this.videoUrl = response[response.length - 1].videoUrl;
      this.videoId = response[response.length - 1].id;
    });
  }

  getCurrentNumberOfKids() {
    this.presenceService.getLastNumberOfKids().subscribe(resp => {
      console.log(resp);
      this.number.numberOfKids = JSON.parse(resp._body).numar;
      this.number.id = JSON.parse(resp._body).id;
    });
  }

  editField(type) {
    if(type==="link"){
      this.isLinkEditable = false;
      this.videoUrlEditable = this.videoUrl;
    }else if( type ==="year"){
      this.isYearEditable = false;
      this.currentYearEditable = this.currentYear;
    } else if(type==="kidsNumber"){
      this.isKidsNumberEditable = false;
      this.numberOfKidsEditable = this.number.numberOfKids;
    }
  }

  saveEditedQuestion(type) {
    if(type==="link"){
      this.isLinkEditable = true;
      this.videoUrl = this.videoUrlEditable;
      this.videoService.updateExistingVideo(this.videoId, { videoUrl: this.videoUrlEditable}).subscribe(
        resp => {
          this.openNotification('success');
        }, error => {
          this.openNotification('error');
        }
      )
    }else if( type ==="year"){
      this.isYearEditable = true;
      this.currentYear = this.currentYearEditable;
    } else if(type==="kidsNumber"){
      this.isKidsNumberEditable = true;
      this.number.numberOfKids = this.numberOfKidsEditable;
      this.presenceService.addNewestNumber( { numar: this.numberOfKidsEditable }).subscribe(
        resp => {
          this.openNotification('success');
        }, error => {
          this.openNotification('error');
        }
      )
    }
  }

  openNotification(message) {
    if (message === 'success') {
      this._service.success(
        'Felicitari! :)',
        'Modificarea a fost realizata cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ne pare rau! :(',
        'Modificarea nu a fost salvata. Te rugam reincearca, dupa ce ai dat refresh paginii!',
        this.options
      );
    }
  }

  cancelEditingAction(type) {
    if(type==="link"){
      this.isLinkEditable = true;
    }else if( type ==="year"){
      this.isYearEditable = true;
    } else if(type==="kidsNumber"){
      this.isKidsNumberEditable = true;
    }
  }
}
