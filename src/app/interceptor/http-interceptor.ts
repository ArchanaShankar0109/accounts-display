import { Injectable, isDevMode } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MOCK_DATA_MAPPING } from "./mock-wrapper";

@Injectable()
export class BankAccountsInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    const MOCK_DATA_PATH = "assets/";

    let apiReq = request;
    console.log(request.url);

    if (isDevMode()) {
      switch (true) {
        case url.endsWith("topup") && method === "POST":
          return topup();
        case url.endsWith("withdraw") && method === "POST":
          return withdraw();
        default:
          // pass through any requests not handled above
          let mapping = MOCK_DATA_MAPPING.filter(
            item =>
              request.url.match(item.url) && request.method === item.method
          )[0];
          apiReq = request.clone({ url: MOCK_DATA_PATH + mapping.file });
          return next.handle(apiReq);
      }
    } else {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error, "error  :::;");
          if (error.status === 401) {
            // refresh token
          } else {
            return throwError(error);
          }
        })
      );
    }
  }
}

function topup() {
  return of(new HttpResponse({ status: 200, body: "Topup successful" }));
}

function withdraw() {
  return of(new HttpResponse({ status: 200, body: "Withdraw successful" }));
}

export let AccountsProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: BankAccountsInterceptor,
  multi: true
};
