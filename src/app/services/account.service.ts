import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  constructor(private http: HttpClient) {}

  static readonly httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

  getBankAccounts(): Observable<any> {
    return this.http.get(`987568/accounts`);
  }

  updateBalance(account, page): Observable<any>{
    return this.http.post(`api/client/987568/account/${account.accountNumber}/${page}`, 
      account, AccountService.httpOptions);
  }
}
