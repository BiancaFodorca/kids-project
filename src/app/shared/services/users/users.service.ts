import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UsersService extends BaseService {
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
    const getResponse$ = this.http.get(`${this.baseUrl}/school/user`);
    return getResponse$;
  }

  getUserById(userId) {
    const getResponse$ = this.http.get(`${this.baseUrl}/school/user/` + userId);
    return getResponse$;
  }

  addNewUser(content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const postReqResponse$ = this.http.post(
      `${this.baseUrl}/school/user/register`,
      content,
      { headers: headers }
    );
    return postReqResponse$;
  }

  updateExistingUser(id, content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const putReqResponse$ = this.http.put(
      `${this.baseUrl}/school/user/` + id,
      content,
      { headers: headers }
    );
    return putReqResponse$;
  }

  deleteUser(userId) {
    const deleteReqResponse$ = this.http.delete(
      `${this.baseUrl}/school/user/` + userId
    );
    return deleteReqResponse$;
  }
}
