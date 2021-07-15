import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Http, ResponseContentType, RequestOptions } from '@angular/http';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable()
export class TodayImportanceService extends BaseService {
  private baseUrl;

  constructor(private httpClient: HttpClient, private http: Http, private lsService: LocalStorageService) {
    super(httpClient);
    this.baseUrl = this.getProvisoryBaseUrl();
  }

  getAll() {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/prescolari/todayimportance`
    );
    return getResponse$;
  }

  getById(id: number) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/prescolari/todayimportance/`+ id
    );
    return getResponse$;
  }

  uploadTodayImportance(fileToUpload: File, title: string, type: string, description: string) {
    const endpoint =
      `${this.baseUrl}/prescolari/todayimportance?title=`+title+`&type=`+type+`&description=`+description;
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload);
    const headers: Headers = new Headers({ enctype: 'multipart/form-data' });
    const baseAuthInfo = this.lsService.baseAuthInfo();
    return this.httpClient.post(endpoint, formData);
  }

  updateTodayImportance(fileToUpload: File, title: string, type: string, description: string, id: number) {
    const endpoint =
      `${this.baseUrl}/prescolari/todayimportance/`+id+`?title=`+title+`&type=`+type+`&description=`+ description;
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload);
    const headers: Headers = new Headers({ enctype: 'multipart/form-data' });
    const baseAuthInfo = this.lsService.baseAuthInfo();
    return this.httpClient.post(endpoint, formData);
  }
}
