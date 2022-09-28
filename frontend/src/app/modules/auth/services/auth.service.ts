import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError,map} from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(private http: HttpClient) {super();}

  login(user: any):Observable<any>{
    let response = this.http
      .post('https://woem7k63g7.execute-api.us-east-1.amazonaws.com/dev/login', user, this.getAuthHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      )
      return response;
  }

  registerUser(user: any):Observable<any>{
    let response = this.http
      .post('https://woem7k63g7.execute-api.us-east-1.amazonaws.com/dev/user', user, this.getAuthHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError)
      )
      return response;
  }
}
