import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPresenceComponent } from './modal-presence/modal-presence.component';
import { PresenceService } from '../../shared/services/presence/presence.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {
  question = {
    text:
      'Cum ne simtim astazi?'
  };
  feelingsArray = [
    {
      feelingTitle: "Bucurosi",
      feelingImgUrl: "./././assets/images/monkey-ears2.gif",
      type: "happiness"
    },
    {
      feelingTitle: "Dezamagiti",
      feelingImgUrl: "./././assets/images/monkey-sad2.gif",
      type: "sadness"
    },
    {
      feelingTitle: "Uimiti",
      feelingImgUrl: "./././assets/images/monkey-mounth2.gif",
      type: "neutral"
    }
  ];
  feelingsNumberOfKids = {
    firstFeelingNumberOfKids: null,
    secondFeelingNumberOfKids: null,
    thirdFeelingNumberOfKids: null,
    absentNumberOfKids: null
  };
  modalFeelingsArray = [];
  showWrongMathFlag = false;
  totalNumberOfKids;
  partialNumberOfKids = 0;
  options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 10
  };

  constructor(
    private modalService: NgbModal,
    private presenceService: PresenceService,
  ) {
    this.getCurrentNumberOfKids();
    this.getAllFeelingList()
  }

  ngOnInit() {}

  getCurrentNumberOfKids() {
    this.totalNumberOfKids = 2;
    this.presenceService.getLastNumberOfKids().subscribe(resp => {
      this.totalNumberOfKids = JSON.parse((<any>resp)._body).numar;
    })
  }

  getAllFeelingList() {
    this.presenceService.getAllFeelings().subscribe(resp => {
      this.feelingsArray = JSON.parse((<any>resp)._body);
    })
  }

  showPresence() {
    this.showWrongMathFlag = this.calculateNumberOfKids();
    console.log(this.showWrongMathFlag);
    if(!this.showWrongMathFlag) {
      this.createDataMoldel();
      const modalRef = this.modalService.open(ModalPresenceComponent);
      modalRef.componentInstance.emotions = this.modalFeelingsArray;
  
      modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  calculateNumberOfKids() {
    this.partialNumberOfKids = this.feelingsNumberOfKids.firstFeelingNumberOfKids + this.feelingsNumberOfKids.secondFeelingNumberOfKids + this.feelingsNumberOfKids.thirdFeelingNumberOfKids;
    if (0 <= this.totalNumberOfKids - this.partialNumberOfKids) {
      this.feelingsNumberOfKids.absentNumberOfKids = this.totalNumberOfKids - this.partialNumberOfKids;
      return false;
    } else {
      return true;
    }
  }

  createDataMoldel() {
    this.modalFeelingsArray = [];
    this.feelingsArray.forEach((element, index) => {
      if(index === 0) {
        this.modalFeelingsArray.push({ title: element.feelingTitle, numberOfKids: this.feelingsNumberOfKids.firstFeelingNumberOfKids, type: element.type});
      } else if (index === 1) {
        this.modalFeelingsArray.push({ title: element.feelingTitle, numberOfKids: this.feelingsNumberOfKids.secondFeelingNumberOfKids, type: element.type});
      } else if (index === 2) {
        this.modalFeelingsArray.push({ title: element.feelingTitle, numberOfKids: this.feelingsNumberOfKids.thirdFeelingNumberOfKids, type: element.type});
      };
    });
    this.modalFeelingsArray.push({ title: "Absenti", numberOfKids: this.feelingsNumberOfKids.absentNumberOfKids, type: "absent"});
  }
}
