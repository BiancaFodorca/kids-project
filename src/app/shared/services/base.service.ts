import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class BaseService {
  // private provisoryBaseUrl = 'http://192.168.88.111:8080';
  private provisoryBaseUrl = 'http://localhost:8080';
  private readonly restApiUrl = environment.baseApiUrl;

  constructor(httpClient: HttpClient) {}

  getProvisoryBaseUrl() {
    return `${this.provisoryBaseUrl}`;
  }

  getUrl() {
    return `${this.restApiUrl}`;
  }

  getAuthApiUrl() {
    return `${this.restApiUrl}/secured`;
  }

  getApiUrl() {
    return `${this.restApiUrl}/api/v1`;
  }
}
