import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  url="http://192.168.1.140:3000/students"
  link="http://192.168.1.140:3000/login"
  constructor(private http:HttpClient) { }

  postdata(data:any)
  {
    return this.http.post(this.url,data)
  }
  postdata_login(data:any)
  {
    return this.http.post(this.link,data)
  }

 
}