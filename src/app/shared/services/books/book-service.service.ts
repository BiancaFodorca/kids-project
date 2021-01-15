import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Http, ResponseContentType, RequestOptions } from '@angular/http';

@Injectable()
export class GeneralBookService extends BaseService {
  private baseUrl;

  constructor(private httpClient: HttpClient, private http: Http) {
    super(httpClient);
    this.baseUrl = this.getProvisoryBaseUrl();
  }

  getAll() {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/prof/document/titles`
    );
    return getResponse$;
  }

  getAllByType(typeBook: string) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/prof/document/titles?type=` + typeBook
    );
    return getResponse$;
  }

  downloadBookByNameAndType(bookName: string, typeBook: string) {
    const options = new RequestOptions({
      responseType: ResponseContentType.Blob
    });
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/prof/document/` + bookName + '?type=' + typeBook,
      options
    );
    return getResponse$;
  }

  uploadNewBook(fileToUpload: File, name: string, type: string) {
    const endpoint =
      `${this.baseUrl}/school/prof/document/upload?fileName=` +
      name +
      '&type=' +
      type;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.httpClient.post(endpoint, formData);
  }

  deleteBook(bookName: string, bookType: string) {
    const deleteReqResponse$ = this.http.delete(
      `${this.baseUrl}/school/prof/document/` + bookName + '?type=' + bookType
    );
    return deleteReqResponse$;
  }
}
