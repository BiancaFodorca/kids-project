import { Component, OnInit } from '@angular/core';
import { TodayImportanceService } from '../../shared/services/today-importance/today-importance-service.service';

@Component({
  selector: 'app-today-importance',
  templateUrl: './today-importance.component.html',
  styleUrls: ['./today-importance.component.css']
})
export class TodayImportanceComponent implements OnInit {
  infoForToday = {
    id: 0,
    title: "Ziua internationala a copiilor",
    image: "./././assets/images/bia.jpg",
    description: "  În fiecare an, în prima zi de vară  se celebrează Ziua Internaţională a Copilului, prilej de a sărbători cea mai frumoasă perioadă din viaţa fiecărui om – copilăria, de a oferi sprijin copiilor, de a aprecia şi iubi copiii şi de a promova bunăstarea copiilor din toată lumea. A fost sărbătorită pentru prima dată la nivel naţional în Turcia în data de 23 aprilie 1920.",
    type: "GENERIC_EVENT",
  }
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    private todayImportanceService: TodayImportanceService
  ) {
    this.getTodayImportanceInfo();
  }

  ngOnInit() {}

  getTodayImportanceInfo() {
    this.todayImportanceService.getAll().subscribe(resp => {
      const response = JSON.parse((<any>resp)._body);
      this.infoForToday  = { ...response[response.length - 1],
        image: 'data:image/jpeg;base64,' + response[response.length - 1].image
      };
    });
  }
}
