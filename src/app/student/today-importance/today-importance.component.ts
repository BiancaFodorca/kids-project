import { Component, OnInit } from '@angular/core';
import { ResponsesService } from '../../shared/services/responses/responses.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { QuestionService } from '../../shared/services/questions/question.service';

@Component({
  selector: 'app-today-importance',
  templateUrl: './today-importance.component.html',
  styleUrls: ['./today-importance.component.css']
})
export class TodayImportanceComponent implements OnInit {
  question = {
    text: 'Scrieti un rezumat al textului citit.'
  };
  infoForToday = {
    title: "Ziua internationala a copiilor",
    image: "./././assets/images/kids18.jpg",
    description: "  În fiecare an, în prima zi de vară  se celebrează Ziua Internaţională a Copilului, prilej de a sărbători cea mai frumoasă perioadă din viaţa fiecărui om – copilăria, de a oferi sprijin copiilor, de a aprecia şi iubi copiii şi de a promova bunăstarea copiilor din toată lumea. A fost sărbătorită pentru prima dată la nivel naţional în Turcia în data de 23 aprilie 1920.",
    type: "BOY_BDAY", //"GENERIC_EVENT"
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
