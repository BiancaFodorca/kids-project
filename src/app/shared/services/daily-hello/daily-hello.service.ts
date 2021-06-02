import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class DailyHelloService extends BaseService {
  private baseUrl;

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private lsService: LocalStorageService
  ) {
    super(httpClient);
    this.baseUrl = this.getProvisoryBaseUrl();
  }

  getAllTypesOfHello() {
    const getResponse$ = this.http.get(`${this.baseUrl}/prescolari/dailyhello`);
    return getResponse$;
  }

  getAllSelectedTypesOfHello() {
    const getResponse$ = this.http.get(`${this.baseUrl}/prescolari/dailyhello/isSelected`);
    return getResponse$;
  }

  getHelloById(helloId) {
    const getResponse$ = this.http.get(`${this.baseUrl}/prescolari/dailyHello/` + helloId);
    return getResponse$;
  }

  addNewHelloType(content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const postReqResponse$ = this.http.post(
      `${this.baseUrl}/prescolari/dailyhello`,
      { headers: headers }
    );
    return postReqResponse$;
  }

  updateExistingHelloType(id, content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    headers.append('Content-Type', 'application/json');
    const putReqResponse$ = this.http.put(
      `${this.baseUrl}/prescolari/dailyhello/` + id,
      content,
      { headers: headers }
    );
    return putReqResponse$;
  }
}
