import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { SignupComponent } from './user-auth/signup/signup.component';
import { SigninComponent } from './user-auth/signin/signin.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

//Modules
import { FormsModule } from '@angular/forms';
import { LoadingButtonComponent } from './shared/components/loading-button/loading-button.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';
import { DateformatterPipe } from './shared/pipes/date-pipe/dateformatter.pipe';
import { FilterPipe } from './shared/pipes/filters/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    LoadingButtonComponent,
    NavBarComponent,
    ConfirmDialogComponent,
    DateformatterPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
