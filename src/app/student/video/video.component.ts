import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from '../../shared/services/video/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  question = {
    text: 'Vizionati cu atentie!'
  };
  videoUrl = "";
  info =
    'Materialele video sunt extrem de atractive pentru cei mici, dezvoltandu-le nu doar vocabularul, ci si creativitatea. Insa in calitate de cadre didactice sau de parinti, trebuie sa supraveghem cu atentie activitatea celor mici in mediul online, astfel incat acestia sa culeaga doar informatiile potrivite vartei lor.';
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
    private videoService: VideoService
  ) {
    this.getVideo();
  }

  ngOnInit() {}

  getVideo() {
    this.videoService.getAllVideos().subscribe(resp => {
      const response = JSON.parse((<any>resp)._body);
      
      this.videoUrl = response[response.length - 1].videoUrl;
    });
  }

  openNotification(message) {
    if (message === 'success') {
      this._service.success(
        'Yupiii! :)',
        'Felicitari, cvintetul a fost salvat cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ohh, ne pare rau! :(',
        'Cvintetul nu a putut fi adaugat. Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }
}
