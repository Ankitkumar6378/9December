import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  sign_api = "http://192.168.1.140:3000/students"
  login_api = "http://192.168.1.140:3000/login"
  forget_api = "http://192.168.1.140:3000/otp"
  reset_api = "http://192.168.1.140:3000/forget"
  constructor(private http: HttpClient) { }

  postdata(data: any): Observable<any> {
    return this.http.post(this.sign_api, data)
  }
  logindata(data: any): Observable<any> {
    return this.http.post(this.login_api, data)
  }
  forgetdata(data: any): Observable<any> {
    return this.http.post(this.forget_api, data)
  }
  resetdata(data: any): Observable<any> {
    return this.http.post(this.reset_api, data)
  }



}