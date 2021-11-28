import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllInOneService } from './shared/services/all-in-one.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tastysoft';
  loggedin : boolean = false
  constructor(
    public allinoneService: AllInOneService,
    private router: Router
  ) {
    if (this.allinoneService.getToken()) {
      this.loggedin = true
      this.router.navigateByUrl('/dashboard');
    }
  }
}
