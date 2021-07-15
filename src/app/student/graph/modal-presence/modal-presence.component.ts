import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-presence',
  templateUrl: './modal-presence.component.html',
  styleUrls: ['./modal-presence.component.css']
})
export class ModalPresenceComponent implements OnInit {
  emotions;

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
  }
}
