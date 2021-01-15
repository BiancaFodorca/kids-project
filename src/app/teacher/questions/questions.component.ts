import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../shared/services/questions/question.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions = [];
  selectedQuestion;
  showEditQuestionTextarea = false;
  editedSelectedQuestion: string;
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    private questionService: QuestionService,
    private _service: NotificationsService
  ) {
    this.getAllQuestions();
  }

  ngOnInit() {}

  getAllQuestions() {
    this.questionService.getAll().subscribe(resp => {
      // this.questions = JSON.parse(resp._body);
    });
  }

  editQuestion(question) {
    this.selectedQuestion = question;
    this.showEditQuestionTextarea = true;
    this.editedSelectedQuestion = question.question;
  }

  saveEditedQuestion() {
    const contentData = {
      question: this.editedSelectedQuestion,
      exerciseNumber: this.selectedQuestion.exerciseNumber
    };
    this.questionService
      .updateExistingQuestion(this.selectedQuestion.id, contentData)
      .subscribe(
        response => {
          this.openNotification('success');
          this.getAllQuestions();
        },
        error => {
          this.openNotification('error');
        }
      );
  }

  openNotification(message) {
    if (message === 'success') {
      this._service.success(
        'Felicitari! :)',
        'Enuntul cerintei a fost modificat cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ne pare rau! :(',
        'Enuntul cerintei nu a putut fi modificat. Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }

  cancelEditingAction() {
    this.clearSelectedQuestionItems();
  }

  clearSelectedQuestionItems() {
    this.selectedQuestion = null;
    this.showEditQuestionTextarea = false;
    this.editedSelectedQuestion = null;
  }
}
