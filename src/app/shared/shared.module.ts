import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodayImportanceService } from './services/today-importance/today-importance-service.service';
import { RiddleService } from './services/riddle/riddle.service';
import { ResponsesService } from './services/responses/responses.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  entryComponents: [],
  providers: [TodayImportanceService, ResponsesService, RiddleService]
})
export class SharedModule {}
