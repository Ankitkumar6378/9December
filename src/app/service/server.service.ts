import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  URL= "http://192.168.1.140:3000"
 
  constructor(private http: HttpClient) { }

  postdata(data: any): Observable<any> {
    return this.http.post(`${this.URL}/students`
    , data)
  }
  logindata(data: any): Observable<any> {
    return this.http.post(`${this.URL}/login`
    , data)  }
  forgetdata(data: any): Observable<any> {
    return this.http.post(`${this.URL}/otp`
    , data)  }
  resetdata(data: any): Observable<any> {
    return this.http.post(`${this.URL}/forget`
    , data)  }


}