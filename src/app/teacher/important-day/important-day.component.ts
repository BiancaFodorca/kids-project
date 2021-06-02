import { Component, OnInit, OnDestroy } from '@angular/core';
import { c } from '@angular/core/src/render3';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TouchSequence } from 'selenium-webdriver';
import { DictionaryService } from '../../dictionary.service';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-important-day',
  templateUrl: './important-day.component.html',
  styleUrls: ['./important-day.component.css']
})
export class ImportantDayComponent implements OnInit, OnDestroy {
  infoForToday = {
    title: "Ziua internationala a copiilor",
    image: "./././assets/images/bia.jpg",
    description: "  În fiecare an, în prima zi de vară  se celebrează Ziua Internaţională a Copilului, prilej de a sărbători cea mai frumoasă perioadă din viaţa fiecărui om – copilăria, de a oferi sprijin copiilor, de a aprecia şi iubi copiii şi de a promova bunăstarea copiilor din toată lumea. A fost sărbătorită pentru prima dată la nivel naţional în Turcia în data de 23 aprilie 1920.",
    type: "GIRL_BDAY", //"GENERIC_EVENT", BOY_BDAY
  }
  eventTypes = [
    { type: "GIRL_BDAY", name: "Aniversare fetita"},
    { type: "BOY_BDAY", name: "Aniversare baietel"},
    { type: "GENERIC_EVENT", name: "Eveniment generic"}
  ];
  dictionary;
  wordsList = [];
  searchedWord: string;
  subscription: Subscription;
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
    private _service: NotificationsService
  ) {
    this.subscription = this.dictionaryService
      .getMessage()
      .subscribe(message => {
        console.log(message.text);
        this.getWords();
        console.log(message);
        if ((message.text = 'asuccess')) {
          this.openNotification('success', 'adaugat');
        } else if ((message.text = 'aerror')) {
          this.openNotification('error', 'adaugat');
        } else if ((message.text = 'esuccess')) {
          this.openNotification('success', 'editat');
        } else if ((message.text = 'eerror')) {
          this.openNotification('error', 'editat');
        } else if ((message.text = 'dsuccess')) {
          this.openNotification('success', 'sters');
        } else if ((message.text = 'derror')) {
          this.openNotification('error', 'sters');
        }
      });
  }

  ngOnInit() {
    this.getWords();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
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
    // const list = [];
    // this.wordsList.forEach((item, index) => {
    //   if (!item.word.indexOf(this.searchedWord)) {
    //     list.push(item);
    //   }
    // });
    // this.wordsList = list;
  }

  openFormModal(word) {
    // const modalRef = this.modalService.open(FormWordComponent);
    // modalRef.componentInstance.word = word;

    // modalRef.result
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  openNotification(message, action) {
    // derror dsucce
    console.log(message.substring(0, 4));
    if (message.substring(0, 4) === 'succ') {
      this._service.success(
        'Yupiii! :)',
        'Felicitari, cuvantul a fost ' + action + ' cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ohh, ne pare rau! :(',
        'Cuvantul nu a putut fi ' +
          action +
          '. Mai incearca dupa ce ai dat refresh paginii',
        this.options
      );
    }
  }
}
