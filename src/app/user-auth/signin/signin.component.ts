import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllInOneService } from 'src/app/shared/services/all-in-one.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { TastysoftService } from 'src/app/shared/services/tastysoft.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signinFormSubmitted: boolean = false;
  isStillSigningIn: boolean = false;
  signinForm = {
    email: '',
    password: '',
  };

  constructor(
    public allinoneService: AllInOneService,
    private messageService: MessageService,
    private tastysoftService: TastysoftService,
    private router: Router
  ) {
    if (this.allinoneService.getToken()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit(): void {}

  signIn() {
    this.signinFormSubmitted = true;
    if (this.signinForm.email && this.signinForm.password) {
      this.isStillSigningIn = true;
      const data = {
        email: this.signinForm.email,
        password: this.signinForm.password,
      };
      this.tastysoftService.signin(data).subscribe(
        (res: any) => {
          if (res.returncode == '300') {
            this.allinoneService.setCookie('token', res.token);
            this.signinFormSubmitted = false;
            this.isStillSigningIn = false;
            window.location.reload();
            this.router.navigateByUrl('/dashboard');
          } else {
            this.signinFormSubmitted = false;
            this.isStillSigningIn = false;
            this.messageService.openSnackBar(res.message, 'warn');
          }
        },
        (err) => {
          this.signinFormSubmitted = false;
          this.isStillSigningIn = false;
        }
      );
    }
  }

  signup() {
    this.router.navigateByUrl('/signup');
  }
}
