import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { DailyHelloService } from '../../shared/services/daily-hello/daily-hello.service';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };
  typesOfHello = [
    // // poezie
    // //cantecel
  ];

  constructor(private dailyHelloService: DailyHelloService, private lsService: LocalStorageService, private _service: NotificationsService,) {
    this.getAllTypesOfHello();
   }

  ngOnInit() {
  }

  getAllTypesOfHello() {
    this.dailyHelloService.getAllTypesOfHello().subscribe(resp => {
      this.typesOfHello = JSON.parse(resp._body);
    });
  }

  handleChange(val: boolean, index: number){
    this.typesOfHello[index].isSelected = !this.typesOfHello[index].isSelected;
    const data = {
      title: this.typesOfHello[index].title,
      imageUrl: this.typesOfHello[index].imageUrl,
      isSelected: this.typesOfHello[index].isSelected
    };
    const id = this.typesOfHello[index].id;

    this.dailyHelloService.updateExistingHelloType(id, data).subscribe(resp => {
      console.log(resp._body);
      this.openNotification("success");
    }, error => {
      console.log("error", error);
      this.openNotification("error");
    });
  }

  openNotification(message) {
    if (message === 'success') {
      this._service.success(
        'Felicitari! :)',
        'Modificarea a fost realizata cu succes!',
        this.options
      );
    } else {
      this._service.error(
        'Ne pare rau! :(',
        'Modificarea nu a fost salvata. Te rugam reincearca, dupa ce ai dat refresh paginii!',
        this.options
      );
    }
  }
}
