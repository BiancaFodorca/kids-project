import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ResponsesService } from '../../shared/services/responses/responses.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { QuestionService } from '../../shared/services/questions/question.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  question = {
    text:
      ' Care este proverbul sau citatul cel mai sugestiv sugerat de acest text?'
  };
  quote: string;
  existingtResponseId;
  bookId;
  noSelectedBook = true;
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };
  exerciceNumber = 1;

  constructor(
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

  createQuote() {
    const data = {
      response: this.quote,
      exerciseNumber: '1',
      idBook: '3'
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

  editQuoate() {
    const data = {
      response: this.quote,
      exerciseNumber: 1,
      idBook: this.bookId
    };
    this.responseService
      .updateExistingResponse(this.existingtResponseId, data)
      .subscribe(
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
        'Felicitari, proverbul a fost salvat cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ohh, ne pare rau! :(',
        'Proverbul nu a putut fi adaugat. Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }
}
