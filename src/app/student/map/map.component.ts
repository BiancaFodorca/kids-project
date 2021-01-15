import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../shared/services/localStorage/local-storage.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  bookId;
  noSelectedBook = true;

  constructor(private lsService: LocalStorageService) {
    this.getBookId();
  }

  getBookId() {
    this.bookId = this.lsService.get('bookId');
    if (this.bookId) {
      this.noSelectedBook = false;
    }
  }

  ngOnInit() {}
}
