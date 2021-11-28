import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { AllInOneService } from './all-in-one.service';
import { MessageService } from './message.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TastysoftService {
  domain = 'http://localhost:3000/api/';

  constructor(
    private allinoneService: AllInOneService,
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private handleError = (error: HttpErrorResponse) => {
    console.error(error);
    if (error.status == 0) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.message);
      this.messageService.openSnackBar('Network Error', 'warn');
    } else {
      // Server side error
      if (error.status.toString().startsWith('5')) {
        this.messageService.openSnackBar('Server Error', 'warn');
      // Client-side error
      } else if (error.status.toString().startsWith('4')) {
        this.messageService.openSnackBar('Client Error', 'warn');
      }
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError('Something bad happened; please try again later.');
  };

  httpRequest(url: string, param: any) {
    const token = this.allinoneService.getToken();
    const options = {
      headers: new HttpHeaders({
        'Accept': 'text/html,application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.http.post(url, param, options).pipe(
      catchError(this.handleError));
  }

  signup(data: any) {
    const url = this.domain + "auth/signup"
    return this.httpRequest(url, data)
  }

  signin(data: any) {
    const url = this.domain + "auth/signin"
    return this.httpRequest(url, data)
  }

  getusers(data: any) {
    const url = this.domain + "user/get"
    return this.httpRequest(url, data)
  }

  deleteuser(data: any) {
    const url = this.domain + "user/delete"
    return this.httpRequest(url, data)
  }

}
