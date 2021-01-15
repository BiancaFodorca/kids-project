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
  LineChart = [];
  @ViewChild('myCanvas') canvasRef: ElementRef;
  ctx;
  chart;

  constructor(
    private elementRef: ElementRef,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.chartit();
  }

  chartit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: [
          'Entuziasm',
          'Neliniste',
          'Optimism',
          'Deprimare',
          'Compasiune',
          'Atasament',
          'Frustrare'
        ],
        datasets: [
          {
            label: 'Punctaj',
            data: this.emotions,
            fill: true,
            lineTension: 0.8,
            borderColor: [
              '#4C792D',
              '#66418C',
              '#AF1923',
              '#A8480C',
              '#14717B',
              '#9E7C21',
              '#AC2258'
            ],
            backgroundColor: [
              '#CEE4A3',
              '#DDCCE2',
              '#FEC9B8',
              '#F9D291',
              '#A9DDDD',
              '#F7DF8C',
              '#F7C8DE'
            ],
            borderWidth: 4
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
