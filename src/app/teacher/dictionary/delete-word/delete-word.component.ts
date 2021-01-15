import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DictionaryService } from '../../../dictionary.service';

@Component({
  selector: 'app-delete-word',
  templateUrl: './delete-word.component.html',
  styleUrls: ['./delete-word.component.css']
})
export class DeleteWordComponent implements OnInit {
  word;
  constructor(
    public activeModal: NgbActiveModal,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit() {}

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  deleteWord() {
    this.dictionaryService.deleteWord(this.word.id).subscribe(
      resp => {
        this.dictionaryService.sendMessage('dsuccess');
      },
      error => {
        this.dictionaryService.sendMessage('derror');
      }
    );
    this.activeModal.close('Modal Closed');
  }
}
