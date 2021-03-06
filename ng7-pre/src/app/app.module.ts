import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavComponent } from './nav/nav.component'
import { forexComponent } from './forex/forex.component'
import { loginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { forecastComponent } from './forecast/forecast.component'
import { AlertComponent } from './_components/alert.component'
import { JwtInterceptor } from './_helpers/jwt.interceptor'
import { ErrorInterceptor } from './_helpers/error.interceptor'
import { registerComponent } from './register/register.component'
import { favourComponent } from './favour/favour.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    forexComponent,
    loginComponent,
    HomeComponent,
    forecastComponent,
    AlertComponent,
    registerComponent,
    favourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }