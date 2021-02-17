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
  question = {
    text:
      'Cum ne simtim astazi?'
  };
  feelingsArray = [
    {
      feelingTitle: "Bucurosi",
      feelingImgUrl: "./././assets/images/monkey-ears2.gif",
      type: "happiness"
    },
    {
      feelingTitle: "Dezamagiti",
      feelingImgUrl: "./././assets/images/monkey-sad2.gif",
      type: "sadness"
    },
    {
      feelingTitle: "Uimiti",
      feelingImgUrl: "./././assets/images/monkey-mounth2.gif",
      type: "neutral"
    }
  ];
  feelingsNumberOfKids = {
    firstFeelingNumberOfKids: null,
    secondFeelingNumberOfKids: null,
    thirdFeelingNumberOfKids: null,
    absentNumberOfKids: null
  };
  modalFeelingsArray = [];
  showWrongMathFlag = false;
  totalNumberOfKids = 18;
  partialNumberOfKids = 0;
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

  showGraphic() {
    this.showWrongMathFlag = this.calculateNumberOfKids();
    console.log(this.showWrongMathFlag);
    if(!this.showWrongMathFlag) {
      this.sendSetOfEmotions();
      this.createDataMoldel();
      const modalRef = this.modalService.open(ModalGraphComponent);
      console.log('modal feelings array');
      console.log(this.modalFeelingsArray);
      modalRef.componentInstance.emotions = this.modalFeelingsArray;
  
      modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  calculateNumberOfKids() {
    this.partialNumberOfKids = this.feelingsNumberOfKids.firstFeelingNumberOfKids + this.feelingsNumberOfKids.secondFeelingNumberOfKids + this.feelingsNumberOfKids.thirdFeelingNumberOfKids;
    if (0 <= this.totalNumberOfKids - this.partialNumberOfKids) {
      this.feelingsNumberOfKids.absentNumberOfKids = this.totalNumberOfKids - this.partialNumberOfKids;
      return false;
    } else {
      return true;
    }
  }

  sendSetOfEmotions() {
    // const data = {
    //   emotions: {
    //     grateful: this.verifyNullity(this.gratefulGrade),
    //     worry: this.verifyNullity(this.worryGrade),
    //     optimism: this.verifyNullity(this.optimismGrade),
    //     sadness: this.verifyNullity(this.sadnessGrade),
    //     compassion: this.verifyNullity(this.compassionGrade),
    //     love: this.verifyNullity(this.loveGrade),
    //     frustration: this.verifyNullity(this.frustrationGrade)
    //   },
    //   exerciseNumber: 2
    // };
    // this.emotionsService.addSetOfEmotions(data).subscribe(
    //   resp => {
    //     this.openNotification('success');
    //   },
    //   error => {
    //     this.openNotification('error');
    //   }
    // );
  }

  createDataMoldel() {
    this.modalFeelingsArray = [];
    this.feelingsArray.forEach((element, index) => {
      if(index === 0) {
        this.modalFeelingsArray.push({ title: element.feelingTitle, numberOfKids: this.feelingsNumberOfKids.firstFeelingNumberOfKids, type: element.type});
      } else if (index === 1) {
        this.modalFeelingsArray.push({ title: element.feelingTitle, numberOfKids: this.feelingsNumberOfKids.secondFeelingNumberOfKids, type: element.type});
      } else if (index === 2) {
        this.modalFeelingsArray.push({ title: element.feelingTitle, numberOfKids: this.feelingsNumberOfKids.thirdFeelingNumberOfKids, type: element.type});
      };
    });
    this.modalFeelingsArray.push({ title: "Absenti", numberOfKids: this.feelingsNumberOfKids.absentNumberOfKids, type: "absent"});
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
