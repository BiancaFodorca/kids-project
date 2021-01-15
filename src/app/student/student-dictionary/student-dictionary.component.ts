import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DictionaryService } from '../../dictionary.service';
import { FormWordComponent } from '../../teacher/dictionary/form-word/form-word.component';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';

@Component({
  selector: 'app-student-dictionary',
  templateUrl: './student-dictionary.component.html',
  styleUrls: ['./student-dictionary.component.css']
})
export class StudentDictionaryComponent implements OnInit {
  alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];
  dictionary;
  wordsList = [];
  searchedWord: string;
  bookId;
  noSelectedBook = true;
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    private modalService: NgbModal,
    private dictionaryService: DictionaryService,
    private lsService: LocalStorageService
  ) {
    this.getBookId();
  }

  ngOnInit() {
    this.getWords();
  }

  getBookId() {
    this.bookId = this.lsService.get('bookId');
    if (this.bookId) {
      this.noSelectedBook = false;
    }
  }

  getWords() {
    this.dictionaryService.getAll().subscribe(resp => {
      this.dictionary = JSON.parse((<any>resp)._body);
      this.getAllWords(this.dictionary);
    });
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getAllWords(dictionary) {
    this.wordsList = [];
    for (const propt in dictionary) {
      if (dictionary.hasOwnProperty(propt)) {
        dictionary[propt].forEach(element => {
          this.wordsList.push(element);
        });
      }
    }
  }

  selectLetterForSpecificWords(letter) {
    this.wordsList = [];
    this.dictionaryService.filterWordsByLetter(letter).subscribe(resp => {
      this.wordsList = JSON.parse((<any>resp)._body);
    });
  }

  searchWord() {
    this.dictionaryService.searchWord(this.searchedWord).subscribe(resp => {
      this.wordsList = JSON.parse((<any>resp)._body);
    });
  }

  openFormModal(word) {
    const modalRef = this.modalService.open(FormWordComponent);
    modalRef.componentInstance.word = word;

    modalRef.result
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
