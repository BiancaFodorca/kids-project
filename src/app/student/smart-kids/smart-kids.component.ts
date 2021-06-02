import { Component, OnInit } from '@angular/core';
import { ResponsesService } from '../../shared/services/responses/responses.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { QuestionService } from '../../shared/services/questions/question.service';

@Component({
  selector: 'app-smart-kids',
  templateUrl: './smart-kids.component.html',
  styleUrls: ['./smart-kids.component.css']
})
export class SmartKidsComponent implements OnInit {
  question = {
    text: 'Scrieti un rezumat al textului citit.'
  };
  infoForToday = {
    title: "Sistemul solar",
    image: ["./././assets/images/sistem-solar.jpg", "./././assets/images/sistem-solar2.jpg"],
    link: "https://www.descopera.org/sistemul-solar/",
    description: "Sistemul nostru solar cuprinde Soarele, cele opt planete, 162 de sateliti naturali ai acestora, 3 planete pitice si corpuri mici: asteorizi, comete, praf, meteoriti etc. Toate planetele orbiteaza in jurul Soarelui, acesta avand peste 99% din masa totala a sistemului solar."
  }
  bookId;
  noSelectedBook = true;
  sumary;
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };
  exerciceNumber = 6;

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

  createSumary() {
    const data = {
      response: this.sumary,
      exerciseNumber: 7,
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

  editSumary() {
    const data = {
      response: this.sumary,
      exerciseNumber: 7,
      idBook: this.bookId
    };
    // this.responseService
    //   .updateExistingResponse(this.existingtResponseId, data)
    //   .subscribe(response => {
    //     console.log(response);
    //   });
  }

  openNotification(message) {
    if (message === 'success') {
      this._service.success(
        'Yupiii! :)',
        'Felicitari, rezumatul a fost salvat cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ohh, ne pare rau! :(',
        'Rezumatul nu a putut fi adaugat. Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }
}
