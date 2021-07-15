import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Http, ResponseContentType, RequestOptions } from '@angular/http';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable()
export class RiddleService extends BaseService {
  private baseUrl;

  constructor(private httpClient: HttpClient, private http: Http, private lsService: LocalStorageService) {
    super(httpClient);
    this.baseUrl = this.getProvisoryBaseUrl();
  }

  getAll() {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/prescolari/riddle`
    );
    return getResponse$;
  }

  getById(id: number) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/prescolari/riddle/`+ id
    );
    return getResponse$;
  }

  uploadRiddle(fileToUpload: File, text: string) {
    const endpoint =
      `${this.baseUrl}/prescolari/riddle?text=`+text;
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload);
    const headers: Headers = new Headers({ enctype: 'multipart/form-data' });
    const baseAuthInfo = this.lsService.baseAuthInfo();
    return this.httpClient.post(endpoint, formData);
  }
}
