import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService{
  constructor(private http: HttpClient) {super(); }

  listGames(): Observable<any> {
    return this.http
      .get('https://gameslibrary-production.up.railway.app/' + 'game', this.getAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  view(id: number | string): Observable<any> {
    return this.http
      .get('https://gameslibrary-production.up.railway.app/' + 'game/' + id, this.getAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
}
