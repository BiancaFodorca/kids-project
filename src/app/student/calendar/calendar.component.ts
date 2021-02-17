import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DictionaryService } from '../../dictionary.service';
import { FormWordComponent } from '../../teacher/dictionary/form-word/form-word.component';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  seasons = [
    {
      id: 1,
      name: "Primavara",
      imgPath: "./././assets/images/season-spring.jpg"
    },
    {
      id: 2,
      name: "Vara",
      imgPath:  "./././assets/images/season-summer.png"
    },
    {
      id: 3,
      name: "Toamna",
      imgPath:  "./././assets/images/season-autumn.png"
    },
    {
      id: 4,
      name: "Iarna",
      imgPath:  "./././assets/images/season-winter.png"
    }
  ];
  daysOfWeek = [
    {
      id: 1,
      name: "Luni",
      icon: "&#128378;"
    },
    {
      id: 2,
      name: "Marti",
      icon: "&#128037;"
    },
    {
      id: 3,
      name: "Miercuri",
      icon: "&#128666;"
    },
    {
      id: 4,
      name: "Joi",
      icon: "&#128081;"
    },
    {
      id: 5,
      name: "Vineri",
      icon: "&#128299;"
    },
    {
      id: 6,
      name: "Sambata",
      icon: "&#128692;"
    },
    {
      id: 7,
      name: "Duminca",
      icon: "&#128106;"
    }
  ];
  months = [
    {
      id: 1,
      name: "Ianuarie",
      iconCode: "&#9924;" //
    },
    {
      id: 2,
      name: "Februarie",
      iconCode: "&#128150;"
    },
    {
      id: 3,
      name: "Martie",
      iconCode: "&#9925;"
    },
    {
      id: 4,
      name: "Aprilie",
      iconCode: "&#9971;"
    },
    {
      id: 5,
      name: "Mai",
      iconCode: "&#127799;"
    },
    {
      id: 6,
      name: "Iunie",
      iconCode: "&#127940;"
    },
    {
      id: 7,
      name: "Iulie",
      iconCode: "&#127774;"
    },
    {
      id: 8,
      name: "August",
      iconCode: "&#127749;"
    },
    {
      id: 9,
      name: "Septembrie",
      iconCode: "&#127810;"
    },
    {
      id: 10,
      name: "Octombrie",
      iconCode: "&#128166;"
    },
    {
      id: 11,
      name: "Noiembrie",
      iconCode: "&#9748;"
    },
    {
      id: 12,
      name: "Decembrie",
      iconCode: "&#127877;"
    }
  ];
  weatherTypes = [
    {
      id: 1,
      name: "Innorata",
      imgPath: "./././assets/images/weather-cloudy.png"
    },
    {
      id: 2,
      name: "Ploiosa",
      imgPath: "./././assets/images/weather-rainy.jpg"
    },
    {
      id: 3,
      name: "Furtunoasa",
      imgPath: "./././assets/images/weather-storm.jpg"
    },
    {
      id: 4,
      name: "Inzapezita",
      imgPath: "./././assets/images/weather-snowing.jpg"
    },
    {
      id: 5,
      name: "Insorita",
      imgPath: "./././assets/images/weather-sunny.png"
    },
    {
      id: 6,
      name: "Torida",
      imgPath: "./././assets/images/weather-warm.png"
    }
  ];
  daysOfMonth = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

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
  @ViewChild('myCanvas') canvasRef: ElementRef;
  ctx;
  radius;
  grad;

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
    // this.dictionaryService.getAll().subscribe(resp => {
    //   this.dictionary = JSON.parse((<any>resp)._body);
    //   this.getAllWords(this.dictionary);
    // });
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

  // drawClock() {
  //   this.drawFace(this.ctx, this.radius);
  //   this.drawNumbers(this.ctx, this.radius);
  //   this.drawTime(this.ctx, this.radius);
  // }
  
  // drawFace(ctx, radius) {
  //   var grad;
  //   ctx.beginPath();
  //   ctx.arc(0, 0, radius, 0, 2*Math.PI);
  //   ctx.fillStyle = 'white';
  //   ctx.fill();
  //   grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  //   grad.addColorStop(0, '#333');
  //   grad.addColorStop(0.5, 'white');
  //   grad.addColorStop(1, '#333');
  //   ctx.strokeStyle = grad;
  //   ctx.lineWidth = radius*0.1;
  //   ctx.stroke();
  //   ctx.beginPath();
  //   ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  //   ctx.fillStyle = '#333';
  //   ctx.fill();
  // }
  
  // drawNumbers(ctx, radius) {
  //   var ang;
  //   var num;
  //   ctx.font = radius*0.15 + "px arial";
  //   ctx.textBaseline="middle";
  //   ctx.textAlign="center";
  //   for(num = 1; num < 13; num++){
  //     ang = num * Math.PI / 6;
  //     ctx.rotate(ang);
  //     ctx.translate(0, -radius*0.85);
  //     ctx.rotate(-ang);
  //     ctx.fillText(num.toString(), 0, 0);
  //     ctx.rotate(ang);
  //     ctx.translate(0, radius*0.85);
  //     ctx.rotate(-ang);
  //   }
  // }
  
  // drawTime(ctx, radius){
  //     var now = new Date();
  //     var hour = now.getHours();
  //     var minute = now.getMinutes();
  //     var second = now.getSeconds();
  //     //hour
  //     hour=hour%12;
  //     hour=(hour*Math.PI/6)+
  //     (minute*Math.PI/(6*60))+
  //     (second*Math.PI/(360*60));
  //     this.drawHand(ctx, hour, radius*0.5, radius*0.07);
  //     //minute
  //     minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
  //     this.drawHand(ctx, minute, radius*0.8, radius*0.07);
  //     // second
  //     second=(second*Math.PI/30);
  //     this.drawHand(ctx, second, radius*0.9, radius*0.02);
  // }
  
  // drawHand(ctx, pos, length, width) {
  //     ctx.beginPath();
  //     ctx.lineWidth = width;
  //     ctx.lineCap = "round";
  //     ctx.moveTo(0,0);
  //     ctx.rotate(pos);
  //     ctx.lineTo(0, -length);
  //     ctx.stroke();
  //     ctx.rotate(-pos);
  // }
}
