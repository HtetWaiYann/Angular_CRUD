import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AllInOneService {

  //
  input_err_msg = "This field cannot be empty!"


  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  // Set cookie function 
  setCookie(key: string, value: string) {
    const expiredDate = new Date();
    expiredDate.setTime(expiredDate.getTime() + (365 * 24 * 60 * 60 * 1000));
    this.cookieService.set(key, value, { expires: expiredDate, sameSite: 'Lax', path: '/' })
  }

  // Get from cookie 
  getToken() {
    return this.cookieService.get("token") || "";
  }

  logout() {
    this.cookieService.deleteAll();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/signin');
  }


  //Sort function
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  //Format date from db to show in HTML
  formatDateToShow(value: string){
    const date = new Date(value)
    return date
  }
}
