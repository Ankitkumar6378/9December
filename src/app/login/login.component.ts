import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ErrorHandlerService } from '../shared/services/error-handler.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginForm!:FormGroup
  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router,private errorHandler:ErrorHandlerService) { }

  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      email:['',[Validators.required,Validators.pattern('^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$')]],
      password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$')]]
    })
  }
  get email()
  {
   return this. loginForm.get('email')
  }
  get password()
  {
   return this.loginForm.get('password')
  }
  login(){
    this.loginForm.markAllAsTouched();

    this.http.post<any>("http://192.168.1.140:3000/",this.loginForm.value).subscribe((result)=>{
  
     if(result.statusCode===201)
     {
       alert("login successfull")
       this.router.navigate(['home'])
     }
     else if(result.statusCode===406)
     {
       alert("error in id/password")
       
     }
     else if(result.statusCode===405)
     {
       alert("user not found")
       
     }
     else
     {
       alert("somthing wrong")
     }
    },(error) => {
      this.errorHandler.handleError(error)
    }
  )
  }

}