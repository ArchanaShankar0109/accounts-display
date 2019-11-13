import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AppService{

  constructor(private http : HttpClient) { }

  getAccounts() : Observable<any[]>{
    return this.http.get<any[]>('/api/client/123456789/accounts');
  }
}

