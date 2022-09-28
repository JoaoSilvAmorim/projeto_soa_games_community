import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ForumService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  listTopics(): Observable<any> {
    return this.http
      .get('http://18.229.155.255:7100/' + 'topics', this.getAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  createTopic(topic: any): Observable<any> {
    topic['token'] = this.getToken();
    return this.http
      .post('http://18.229.155.255:7100/' + 'topics', topic, this.getAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getTopic(id: number | string): Observable<any> {
    return this.http
      .get('http://18.229.155.255:7100/' + 'topics/'+id, this.getAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getAnswersByTopic(id: number | string): Observable<any> {
    return this.http
      .get('http://18.229.155.255:7100/' + 'answers/topic/'+id, this.getAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  saveAnswer(answerForm:any): Observable<any> {
    answerForm['token'] = this.getToken();
    answerForm['userId'] = this.getUser().id;
    return this.http
      .post('http://18.229.155.255:7100/' + 'answers', answerForm, this.getAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  listGames(): Observable<any> {
    return this.http
      .get('https://gameslibrary-production.up.railway.app/' + 'game', this.getAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

}
