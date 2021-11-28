import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AllInOneService } from '../services/all-in-one.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private allinoneService: AllInOneService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    const atoken = this.allinoneService.getToken();
    if (!atoken) {
      this.allinoneService.logout();
      return false;
    } else {
      return true;
    }
  }
  
}
