import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './shared/services/base.service';
import { Http, Headers } from '@angular/http';
import { LocalStorageService } from './shared/services/localStorage/local-storage.service';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SmartKidsService extends BaseService {
  private baseUrl;
  private subject = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private lsService: LocalStorageService
  ) {
    super(httpClient);
    this.baseUrl = this.getProvisoryBaseUrl();
  }

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getAll() {
    const getResponse$ = this.http.get(`${this.baseUrl}/prescolari/newlesson`);
    return getResponse$;
  }

  getLessonById(wordId: number) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/prescolari/newlesson/` + wordId
    );
    return getResponse$;
  }

  uploadLesson(fileToUpload1: File, fileToUpload2: File, title: string, link: string, description: string) {
    const endpoint =
      `${this.baseUrl}/prescolari/newlesson?title=`+title+`&link=`+link+`&description=`+description;
    const formData: FormData = new FormData();
    formData.append('image1', fileToUpload1);
    formData.append('image2', fileToUpload2);
    const headers: Headers = new Headers({ enctype: 'multipart/form-data' });
    const baseAuthInfo = this.lsService.baseAuthInfo();
    return this.httpClient.post(endpoint, formData);
  }
}
