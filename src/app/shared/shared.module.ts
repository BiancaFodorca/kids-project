import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralBookService } from './services/books/book-service.service';
import { ResponsesService } from './services/responses/responses.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  entryComponents: [],
  providers: [GeneralBookService, ResponsesService]
})
export class SharedModule {}
