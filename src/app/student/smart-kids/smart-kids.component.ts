import { Component, OnInit } from '@angular/core';
import { SmartKidsService } from '../../smart-kids.service';

@Component({
  selector: 'app-smart-kids',
  templateUrl: './smart-kids.component.html',
  styleUrls: ['./smart-kids.component.css']
})
export class SmartKidsComponent implements OnInit {
  question = {
    text: 'Scrieti un rezumat al textului citit.'
  };
  infoForToday = {
    title: "Sistemul solar",
    image1: "./././assets/images/sistem-solar.jpg", 
    image2: "./././assets/images/sistem-solar2.jpg",
    link: "https://www.descopera.org/sistemul-solar/",
    description: "Sistemul nostru solar cuprinde Soarele, cele opt planete, 162 de sateliti naturali ai acestora, 3 planete pitice si corpuri mici: asteorizi, comete, praf, meteoriti etc. Toate planetele orbiteaza in jurul Soarelui, acesta avand peste 99% din masa totala a sistemului solar."
  }
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    private smartKidsService: SmartKidsService,
  ) {
    this.getLesson();
  }

  ngOnInit() {}

  getLesson() {
    this.smartKidsService.getAll().subscribe(resp => {
      const response = JSON.parse((<any>resp)._body);
      this.infoForToday  = { ...response[response.length - 1],
        image1: 'data:image/jpeg;base64,' + response[response.length - 1].image1,
        image2: 'data:image/jpeg;base64,' + response[response.length - 1].image2
      };
    });
  }
}
