import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalGraphComponent } from './modal-graph/modal-graph.component';
import { EmotionsService } from '../../shared/services/emotions/emotions.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { QuestionService } from '../../shared/services/questions/question.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  gradesList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  question = {
    text:
      'Oferiti note pe o scara de la 0 la 10 in functie de emotiile pe care le-ati simtit in momentul in care ati lecturat capitolul.'
  };
  gratefulGrade;
  optimismGrade;
  worryGrade;
  sadnessGrade;
  compassionGrade;
  loveGrade;
  frustrationGrade;
  emotionsArray = [];
  bookId;
  noSelectedBook = true;
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };
  exerciceNumber = 2;

  constructor(
    private modalService: NgbModal,
    private emotionsService: EmotionsService,
    private lsService: LocalStorageService,
    private _service: NotificationsService,
    private questionService: QuestionService
  ) {
    this.getBookId();
    this.getQuestionSentence();
  }

  ngOnInit() {}

  getBookId() {
    this.bookId = this.lsService.get('bookId');
    if (this.bookId) {
      this.noSelectedBook = false;
    }
  }

  getQuestionSentence() {
    this.questionService
      .getQuestionByExerciseNumber(this.exerciceNumber)
      .subscribe(resp => {
        // this.question.text = JSON.parse(resp._body).question;
      });
  }

  onSelectionGratefulChange(grade) {
    this.gratefulGrade = grade;
  }

  onSelectionWorryChange(grade) {
    this.worryGrade = grade;
  }

  onSelectionOptimismChange(grade) {
    this.optimismGrade = grade;
  }

  onSelectionSadnessChange(grade) {
    this.sadnessGrade = grade;
  }

  onSelectionCompassionChange(grade) {
    this.compassionGrade = grade;
  }

  onSelectionLoveChange(grade) {
    this.loveGrade = grade;
  }

  onSelectionFrustrationChange(grade) {
    this.frustrationGrade = grade;
  }

  showGraphic() {
    this.sendSetOfEmotions();
    this.createDataMoldel();
    const modalRef = this.modalService.open(ModalGraphComponent);
    modalRef.componentInstance.emotions = this.emotionsArray;

    modalRef.result
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  sendSetOfEmotions() {
    const data = {
      emotions: {
        grateful: this.verifyNullity(this.gratefulGrade),
        worry: this.verifyNullity(this.worryGrade),
        optimism: this.verifyNullity(this.optimismGrade),
        sadness: this.verifyNullity(this.sadnessGrade),
        compassion: this.verifyNullity(this.compassionGrade),
        love: this.verifyNullity(this.loveGrade),
        frustration: this.verifyNullity(this.frustrationGrade)
      },
      exerciseNumber: 2
    };
    this.emotionsService.addSetOfEmotions(data).subscribe(
      resp => {
        this.openNotification('success');
      },
      error => {
        this.openNotification('error');
      }
    );
  }

  createDataMoldel() {
    this.emotionsArray = [
      this.verifyNullity(this.gratefulGrade),
      this.verifyNullity(this.worryGrade),
      this.verifyNullity(this.optimismGrade),
      this.verifyNullity(this.sadnessGrade),
      this.verifyNullity(this.compassionGrade),
      this.verifyNullity(this.loveGrade),
      this.verifyNullity(this.frustrationGrade)
    ];
  }

  verifyNullity(score) {
    if (!score) {
      return 0;
    }
    return score;
  }

  openNotification(message) {
    if (message === 'success') {
      this._service.success(
        'Yupiii! :)',
        'Felicitari, punctajul acordat emotiilor au fost salvate cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ohh, ne pare rau! :(',
        'Punctajul acordat emotiilor nu a putut fi adaugat. Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }
}
