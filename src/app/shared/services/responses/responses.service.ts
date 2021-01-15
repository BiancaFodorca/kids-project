import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable()
export class ResponsesService extends BaseService {
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
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/pupil/response/`
    );
    return getResponse$;
  }

  getResponseById(id: number) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/pupil/response/` + id
    );
    return getResponse$;
  }

  getResponseFilteredByParams(userId, exerciseNumber, bookId) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/pupil/response/`
    );
    return getResponse$;
  }

  createResponse(contentExercise) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const postReqResponse$ = this.http.post(
      `${this.baseUrl}/school/pupil/response/`,
      contentExercise,
      { headers: headers }
    );
    return postReqResponse$;
  }

  updateExistingResponse(responseId, content) {
    const putReqResponse$ = this.http.put(
      `${this.baseUrl}/school/pupil/response/` + responseId,
      content
    );
    return putReqResponse$;
  }

  deleteResponse(responseId) {
    const deleteReqResponse$ = this.http.delete(
      `${this.baseUrl}/school/pupil/response/` + responseId
    );
    return deleteReqResponse$;
  }
}
