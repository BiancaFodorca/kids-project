import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './shared/services/base.service';
import { Http, Headers } from '@angular/http';
import { LocalStorageService } from './shared/services/localStorage/local-storage.service';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class DictionaryService extends BaseService {
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
    const getResponse$ = this.http.get(`${this.baseUrl}/school/dictionar`);
    return getResponse$;
  }

  getWordById(wordId: number) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/dictionar/` + wordId
    );
    return getResponse$;
  }

  addNewWord(word) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const postReqResponse$ = this.http.post(
      `${this.baseUrl}/school/dictionar`,
      word,
      { headers: headers }
    );
    return postReqResponse$;
  }

  updateExistingWord(id, word) {
    const putReqResponse$ = this.http.put(
      `${this.baseUrl}/school/dictionar/` + id,
      word
    );
    return putReqResponse$;
  }

  deleteWord(id) {
    const deleteReqResponse$ = this.http.delete(
      `${this.baseUrl}/school/dictionar/` + id
    );
    return deleteReqResponse$;
  }

  filterWordsByLetter(letter) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/dictionar/letter?letter=` + letter
    );
    return getResponse$;
  }

  searchWord(word) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/dictionar/find?word=` + word
    );
    return getResponse$;
  }
}
