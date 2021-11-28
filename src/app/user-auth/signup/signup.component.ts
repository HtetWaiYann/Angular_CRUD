import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllInOneService } from 'src/app/shared/services/all-in-one.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { TastysoftService } from 'src/app/shared/services/tastysoft.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupFormSubmitted: boolean = false;
  isStillSigningUp: boolean = false;

  signupForm = {
    name: '',
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

  signUp() {
    this.signupFormSubmitted = true;
    if (
      this.signupForm.name &&
      this.signupForm.email &&
      this.signupForm.password
    ) {
      this.isStillSigningUp = true;
      const data = {
        name: this.signupForm.name,
        email: this.signupForm.email,
        password: this.signupForm.password,
      };
      this.tastysoftService.signup(data).subscribe(
        (res: any) => {
          if (res.returncode == '300') {
            this.allinoneService.setCookie('token', res.token);
            this.signupFormSubmitted = false;
            this.isStillSigningUp = false;
            window.location.reload();
            this.router.navigateByUrl('/dashboard');
          } else {
            this.signupFormSubmitted = false;
            this.isStillSigningUp = false;
            this.messageService.openSnackBar(res.message, 'warn')
          }
        },
        (err) => {
          this.signupFormSubmitted = false;
          this.isStillSigningUp = false;
        }
      );
    }
  }

  signin() {
    this.router.navigateByUrl('signin');
  }
}
