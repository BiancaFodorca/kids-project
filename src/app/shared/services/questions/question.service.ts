import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import { LocalStorageService } from "../localStorage/local-storage.service";

@Injectable()
export class QuestionService extends BaseService {
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
      `${this.baseUrl}/school/prof/questions/active`
    );
    return getResponse$;
  }

  getQuestionById(questionId) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/prof/questions/` + questionId
    );
    return getResponse$;
  }

  getQuestionByExerciseNumber(exerciseNumber) {
    const getResponse$ = this.http.get(
      `${this.baseUrl}/school/prof/questions/active/` + exerciseNumber
    );
    return getResponse$;
  }

  addNewQuestion(content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      "Authorization",
      "Basic " + btoa(baseAuthInfo)
    );
    const postReqResponse$ = this.http.post(
      `${this.baseUrl}/school/prof/questions/`,
      content,
      { headers: headers }
    );
    return postReqResponse$;
  }

  updateExistingQuestion(id, content) {
    const headers: Headers = new Headers();
    const baseAuthInfo = this.lsService.baseAuthInfo();
    const userData = headers.append(
      "Authorization",
      "Basic " + btoa(baseAuthInfo)
    );
    const putReqResponse$ = this.http.put(
      `${this.baseUrl}/school/prof/questions/` + id,
      content,
      { headers: headers }
    );
    return putReqResponse$;
  }

  deleteQuestion(questionId) {
    const deleteReqResponse$ = this.http.delete(
      `${this.baseUrl}/school/prof/questions/` + questionId
    );
    return deleteReqResponse$;
  }
}
