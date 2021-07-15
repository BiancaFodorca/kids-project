import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
      imgPath: "./././assets/images/season-spring.jpg",
      isSelected: false
    },
    {
      id: 2,
      name: "Vara",
      imgPath:  "./././assets/images/season-summer.png",
      isSelected: false
    },
    {
      id: 3,
      name: "Toamna",
      imgPath:  "./././assets/images/season-autumn.png",
      isSelected: false
    },
    {
      id: 4,
      name: "Iarna",
      imgPath:  "./././assets/images/season-winter.png",
      isSelected: false
    }
  ];
  daysOfWeek = [
    {
      id: 1,
      name: "Luni",
      icon: "&#128378;",
      isSelected: false
    },
    {
      id: 2,
      name: "Marti",
      icon: "&#128037;",
      isSelected: false
    },
    {
      id: 3,
      name: "Miercuri",
      icon: "&#128666;",
      isSelected: false

    },
    {
      id: 4,
      name: "Joi",
      icon: "&#128081;",
      isSelected: false
    },
    {
      id: 5,
      name: "Vineri",
      icon: "&#128299;",
      isSelected: false
    },
    {
      id: 6,
      name: "Sambata",
      icon: "&#128692;",
      isSelected: false
    },
    {
      id: 7,
      name: "Duminca",
      icon: "&#128106;",
      isSelected: false
    }
  ];
  months = [
    {
      id: 1,
      name: "Ianuarie",
      iconCode: "&#9924;",
      isSelected: false
    },
    {
      id: 2,
      name: "Februarie",
      iconCode: "&#128150;",
      isSelected: false
    },
    {
      id: 3,
      name: "Martie",
      iconCode: "&#9925;",
      isSelected: false
    },
    {
      id: 4,
      name: "Aprilie",
      iconCode: "&#9971;",
      isSelected: false
    },
    {
      id: 5,
      name: "Mai",
      iconCode: "&#127799;",
      isSelected: false
    },
    {
      id: 6,
      name: "Iunie",
      iconCode: "&#127940;",
      isSelected: false
    },
    {
      id: 7,
      name: "Iulie",
      iconCode: "&#127774;",
      isSelected: false
    },
    {
      id: 8,
      name: "August",
      iconCode: "&#127749;",
      isSelected: false
    },
    {
      id: 9,
      name: "Septembrie",
      iconCode: "&#127810;",
      isSelected: false
    },
    {
      id: 10,
      name: "Octombrie",
      iconCode: "&#128166;",
      isSelected: false
    },
    {
      id: 11,
      name: "Noiembrie",
      iconCode: "&#9748;",
      isSelected: false
    },
    {
      id: 12,
      name: "Decembrie",
      iconCode: "&#127877;",
      isSelected: false
    }
  ];
  weatherTypes = [
    {
      id: 1,
      name: "Innorata",
      imgPath: "./././assets/images/weather-cloudy.png",
      isSelected: false
    },
    {
      id: 2,
      name: "Ploiosa",
      imgPath: "./././assets/images/weather-rainy.jpg",
      isSelected: false
    },
    {
      id: 3,
      name: "Furtunoasa",
      imgPath: "./././assets/images/weather-storm.jpg",
      isSelected: false
    },
    {
      id: 4,
      name: "Inzapezita",
      imgPath: "./././assets/images/weather-snowing.jpg",
      isSelected: false
    },
    {
      id: 5,
      name: "Insorita",
      imgPath: "./././assets/images/weather-sunny.png",
      isSelected: false
    },
    {
      id: 6,
      name: "Torida",
      imgPath: "./././assets/images/weather-warm.png",
      isSelected: false
    }
  ];
  daysOfMonth = [ 
    { id: 1, isSelected: false },
    { id: 2, isSelected: false },
    { id: 3, isSelected: false },
    { id: 4, isSelected: false },
    { id: 5, isSelected: false },
    { id: 6, isSelected: false },
    { id: 7, isSelected: false },
    { id: 8, isSelected: false },
    { id: 9, isSelected: false },
    { id: 10, isSelected: false },
    { id: 11, isSelected: false },
    { id: 12, isSelected: false },
    { id: 13, isSelected: false },
    { id: 14, isSelected: false },
    { id: 15, isSelected: false },
    { id: 16, isSelected: false },
    { id: 17, isSelected: false },
    { id: 18, isSelected: false },
    { id: 19, isSelected: false },
    { id: 20, isSelected: false },
    { id: 21, isSelected: false },
    { id: 22, isSelected: false },
    { id: 23, isSelected: false },
    { id: 24, isSelected: false },
    { id: 25, isSelected: false },
    { id: 26, isSelected: false },
    { id: 27, isSelected: false },
    { id: 28, isSelected: false },
    { id: 29, isSelected: false },
    { id: 30, isSelected: false },
    { id: 31, isSelected: false }];
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };
  selectedSeason;

  constructor(
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
  }

  selectSeason(season, index) {
    this.seasons.forEach((s, i) => {
      if(index === i ) {
        s.isSelected = !season.isSelected;
      } else {
        s.isSelected = false;
      }
    })
  }

  selectMonth(month, index) {
    this.months.forEach((m, i) => {
      if(index === i ) {
        m.isSelected = !month.isSelected;
      } else {
        m.isSelected = false;
      }
    })
  }

  selectDayOfTheWeek(day) {
    this.daysOfWeek.forEach((d) => {
      if(d.name === day.name ) {
        d.isSelected = true;
      } else {
        d.isSelected = false;
      }
    })
  }

  selectDayOfTheMonth(day) {
    this.daysOfMonth.forEach((d) => {
      if(d.id === day.id ) {
        d.isSelected = true;
      } else {
        d.isSelected = false;
      }
    })
  }

  selectWeather(weather, index) {
    this.weatherTypes.forEach((w, i) => {
      if(index === i ) {
        w.isSelected = !weather.isSelected;
      } else {
        w.isSelected = false;
      }
    })
  }
}
