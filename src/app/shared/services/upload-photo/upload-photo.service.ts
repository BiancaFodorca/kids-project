import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { BaseService } from '../base.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable()
export class UploadPhotoService extends BaseService {
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
    const getResponse$ = this.http.get(`${this.baseUrl}/school/pupil/photos`);
    return getResponse$;
  }

  getLastPhotoByUserIdAndExerciseNumber(userId, exerciseNumber, idBook) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/pupil/photos/find/last?idUser=` +
        userId +
        '&exerciseNumber=' +
        exerciseNumber +
        '&idBook=' +
        idBook
    );
    return getResponse$;
  }

  getPhotoById(photoId) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/pupil/photos/` + photoId
    );
    return getResponse$;
  }

  downloadPhotoByNameAndType(userId, exerciseNumber, idBook) {
    const options = new RequestOptions({
      responseType: ResponseContentType.Blob
    });
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/pupil/photos/find/last?idUser=` +
        userId +
        '&exerciseNumber=' +
        exerciseNumber +
        '&idBook=' +
        idBook,
      options
    );
    return getResponse$;
  }

  uploadNewPhoto(exerciseNumber, idBook, fileToUpload) {
    const endpoint =
      `${this.baseUrl}/school/pupil/photos?exerciseNumber=` +
      exerciseNumber +
      '&idBook=' +
      idBook;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    const headers: Headers = new Headers({ enctype: 'multipart/form-data' });
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      'Authorization',
      'Basic ' + btoa(baseAuthInfo)
    );
    const options = new RequestOptions({ headers: headers });
    return this.http.post(endpoint, formData, { headers: headers });
  }

  deletePhoto(photoId) {
    const deleteReqResponse$ = this.http.delete(
      `${this.baseUrl}/school/pupil/photos/` + photoId
    );
    return deleteReqResponse$;
  }
}
