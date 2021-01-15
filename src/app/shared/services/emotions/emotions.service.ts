import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable()
export class EmotionsService extends BaseService {
  private baseUrl;

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private lsService: LocalStorageService
  ) {
    super(httpClient);
    this.baseUrl = this.getProvisoryBaseUrl();
  }

  getAll() {
    const getResponse$ = this.http.get(`${this.baseUrl}/school/pupil/emotions`);
    return getResponse$;
  }

  getEmotionsFilteredByUserId(userId, exerciseNumber) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/pupil/emotions/find/last?idUser=` +
        userId +
        '&exerciseNumber=' +
        exerciseNumber
    );
    return getResponse$;
  }

  getEmotionsById(emotionId) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/pupil/emotions/` + emotionId
    );
    return getResponse$;
  }

  addSetOfEmotions(emotions) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const postReqResponse$ = this.http.post(
      `${this.baseUrl}/school/pupil/emotions`,
      emotions,
      { headers: headers }
    );
    return postReqResponse$;
  }

  updateExistingEmotions(id, content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const putReqResponse$ = this.http.put(
      `${this.baseUrl}/school/pupil/emotions/` + id,
      content,
      { headers: headers }
    );
    return putReqResponse$;
  }

  deleteEmotions(emotionId) {
    const deleteReqResponse$ = this.http.delete(
      `${this.baseUrl}/school/pupil/emotions/` + emotionId
    );
    return deleteReqResponse$;
  }
}
