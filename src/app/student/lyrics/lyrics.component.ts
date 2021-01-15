import { Component, OnInit } from '@angular/core';
import { ResponsesService } from '../../shared/services/responses/responses.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { QuestionService } from '../../shared/services/questions/question.service';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.css']
})
export class LyricsComponent implements OnInit {
  question = {
    text: 'Scrieti un cvintet sugestiv pentru acest text.'
  };
  bookId;
  noSelectedBook = true;
  cvintet;
  info =
    'Cvintetul este o poezie cu 5 versuri alcătuite astfel: Primul vers este un cuvânt - cheie care denumeşte subiectul ce urmează să fie descris. Cuvântul trebuie să fie un substantiv. Al doilea vers este format din 2 adjective ce descriu subiectul.Al treilea vers este format din 3 verbe, de obicei la gerunziu.Al patrulea vers este format din 4 cuvinte (o propoziţie) care exprimă sentimentele faţă de subiectul în temă. Ultimul vers este format dintr-un cuvânt care îl caracterizează pe subiect';
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };
  exerciceNumber = 5;

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
