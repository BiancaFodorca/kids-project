import { Component, OnInit } from '@angular/core';
import { ResponsesService } from '../../shared/services/responses/responses.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { QuestionService } from '../../shared/services/questions/question.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  question = {
    text: 'Vizionati cu atentie!'
  };
  videoUrl = "https://www.youtube.com/embed/zO07amDIYDU";
  bookId;
  noSelectedBook = true;
  cvintet;
  info =
    'Materialele video sunt extrem de atractive pentru cei mici, dezvoltandu-le nu doar vocabularul, ci si creativitatea. Insa in calitate de cadre didactice sau de parinti, trebuie sa supraveghem cu atentie activitatea celor mici in mediul online, astfel incat acestia sa culeaga doar informatiile potrivite vartei lor.';
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };
  exerciceNumber = 5;

  constructor(
    public sanitizer:DomSanitizer,
    private responseService: ResponsesService,
    private lsService: LocalStorageService,
    private _service: NotificationsService,
    private questionService: QuestionService
  ) {
    this.getBookId();
    this.getQuestionSentence();
  }

  ngOnInit() {}

  getQuestionSentence() {
    this.questionService
      .getQuestionByExerciseNumber(this.exerciceNumber)
      .subscribe(resp => {
        // this.question.text = JSON.parse(resp._body).question;
      });
  }

  getBookId() {
    this.bookId = this.lsService.get('bookId');
    if (this.bookId) {
      this.noSelectedBook = false;
    }
  }

  createCvintet() {
    const data = {
      response: this.cvintet,
      exerciseNumber: 5,
      idBook: this.bookId
    };
    this.responseService.createResponse(data).subscribe(
      response => {
        this.openNotification('success');
      },
      error => {
        this.openNotification('error');
      }
    );
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
