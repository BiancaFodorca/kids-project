import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BookService {
  constructor(private httpClient: HttpClient) {}

  postFile(fileToUpload: File, name: string, type: string) {
    const endpoint =
      "http://192.168.88.111:8080/school/prof/document/upload?fileName=" +
      name +
      "&type=" +
      type;
    const formData: FormData = new FormData();
    formData.append("fileKey", fileToUpload, fileToUpload.name);
    return this.httpClient.post(endpoint, formData); // , { headers: yourHeadersConfig }
  }
}
