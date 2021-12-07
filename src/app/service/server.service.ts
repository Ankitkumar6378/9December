import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  URL= environment.baseurl;
 
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