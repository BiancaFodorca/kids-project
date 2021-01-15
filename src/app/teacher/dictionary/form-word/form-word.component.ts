import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DictionaryService } from '../../../dictionary.service';

@Component({
  selector: 'app-form-word',
  templateUrl: './form-word.component.html',
  styleUrls: ['./form-word.component.css']
})
export class FormWordComponent implements OnInit {
  wordForm: FormGroup;
  word;
  editWordFlag = false;
  wordFormCtrl = {
    word: '',
    definition: ''
  };

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit() {
    if (this.word !== null) {
      this.editWordFlag = false;
      this.wordFormCtrl = {
        word: this.word.word,
        definition: this.word.definition
      };
    } else {
      this.editWordFlag = true;
    }
    this.wordForm = this.formBuilder.group({
      word: [this.wordFormCtrl.word, Validators.required],
      definition: [this.wordFormCtrl.definition, Validators.required]
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  saveNewWord() {
    const newWordAdded = {
      word: this.wordForm.controls['word'].value,
      definition: this.wordForm.controls['definition'].value
    };
    this.dictionaryService.addNewWord(newWordAdded).subscribe(
      resp => {
        this.dictionaryService.sendMessage('asuccess');
      },
      error => {
        this.dictionaryService.sendMessage('aerror');
      }
    );
    this.closeModal();
  }

  editExistingWord() {
    const wordToBeAdded = {
      word: this.wordForm.controls['word'].value,
      definition: this.wordForm.controls['definition'].value,
      id: this.word.id
    };
    this.dictionaryService
      .updateExistingWord(this.word.id, wordToBeAdded)
      .subscribe(
        resp => {
          this.dictionaryService.sendMessage('esuccess');
        },
        error => {
          this.dictionaryService.sendMessage('eerror');
        }
      );
    this.closeModal();
  }
}
