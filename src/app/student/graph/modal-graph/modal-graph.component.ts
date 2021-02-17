import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-graph',
  templateUrl: './modal-graph.component.html',
  styleUrls: ['./modal-graph.component.css']
})
export class ModalGraphComponent implements OnInit {
  emotions;

  constructor(
    private elementRef: ElementRef,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    console.log(this.emotions)
  }
}
