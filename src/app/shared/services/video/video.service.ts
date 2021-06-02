import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class VideoService extends BaseService {
  private baseUrl;

  constructor(
    private httpClient: HttpClient,
    private http: Http,
    private lsService: LocalStorageService
  ) {
    super(httpClient);
    this.baseUrl = this.getProvisoryBaseUrl();
  }

  getAllVideos() {
    const getResponse$ = this.http.get(`${this.baseUrl}/prescolari/video`);
    return getResponse$;
  }

  getVideoById(videoId) {
    const getResponse$ = this.http.get(`${this.baseUrl}/prescolari/video/` + videoId);
    return getResponse$;
  }

  addNewVideo(content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const postReqResponse$ = this.http.post(
      `${this.baseUrl}/prescolari/video`,
      { headers: headers }
    );
    return postReqResponse$;
  }

  updateExistingVideo(id, content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const putReqResponse$ = this.http.put(
      `${this.baseUrl}/prescolari/video/` + id,
      content,
      { headers: headers }
    );
    return putReqResponse$;
  }
}
