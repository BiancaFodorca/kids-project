import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PresenceService extends BaseService {
  private baseUrl;

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private lsService: LocalStorageService
  ) {
    super(httpClient);
    this.baseUrl = this.getProvisoryBaseUrl();
  }

  getAllNumber() {
    const getResponse$ = this.http.get(`${this.baseUrl}/prescolari/numarprescolari`);
    return getResponse$;
  }

  getLastNumberOfKids() {
    const getResponse$ = this.http.get(`${this.baseUrl}/prescolari/numarprescolari/last`);
    return getResponse$;
  }

  addNewestNumber(content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const postReqResponse$ = this.http.post(
      `${this.baseUrl}/prescolari/numarprescolari`,
      content,
      { headers: headers }
    );
    return postReqResponse$;
  }

  updateNumberOfKids(id, content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const putReqResponse$ = this.http.put(
      `${this.baseUrl}/prescolari/numarPrescolari/` + id,
      content,
      { headers: headers }
    );
    return putReqResponse$;
  }

  getAllFeelings() {
    const getResponse$ = this.http.get(`${this.baseUrl}/prescolari/presence`);
    return getResponse$;
  }

  
  getFeelingById(emotionId) {
    const getResponse$ = this.http.get(`${this.baseUrl}/prescolari/presence/` + emotionId);
    return getResponse$;
  }

  addNewFeeling(content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const postReqResponse$ = this.http.post(
      `${this.baseUrl}/prescolari/presence`,
      content,
      { headers: headers }
    );
    return postReqResponse$;
  }

  updateExistingFeeling(id, content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const putReqResponse$ = this.http.put(
      `${this.baseUrl}/prescolari/presence/` + id,
      content,
      { headers: headers }
    );
    return putReqResponse$;
  }
}
