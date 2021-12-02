import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import{HttpClient} from'@angular/common/http'
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ErrorHandlerService } from '../shared/services/error-handler.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!:FormGroup
  public errorMessage: string = '';

  constructor(private formbuilder:FormBuilder, private http:HttpClient,private router:Router,private errorHandler:ErrorHandlerService ) { }
  ngOnInit(): void {
    this.registrationForm=this.formbuilder.group({
    username:['',[Validators.required,Validators.pattern('^[a-zA-Z ]{3,30}$')]],
    email:['',[Validators.required,Validators.pattern('^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$')]],
    mobile:['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
    password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$')]]
    })
  }
  get username()
  {
   return this.registrationForm.get('username')
  }
  get email()
  {
   return this.registrationForm.get('email')
  }
  get mobile()
  {
   return this.registrationForm.get('mobile')
  }
  get password()
  {
   return this.registrationForm.get('password')
  }
  submit(){
    
      if(!this.registrationForm.valid){
        return this.registrationForm.markAllAsTouched()
      }
      else {
      //process you request
      
    this.http.post<any>("http://192.168.1.140:3000/students",this.registrationForm.value).subscribe((result)=>{
      if(result.statusCode===200)
      {
        alert("registration successfull")
        this.router.navigate(['login'])
      }
      else if(result.statusCode===402)
      {
        alert("email already exist")
      }
      else if(result.statusCode===403)
      {
        alert("phone already exist")
      }
      else if(result.statusCode===401)
      {
        alert("Not successfull")
      }
      else
      {
        alert('somthing wrong')
      }
    
   },(error) => {
      this.errorHandler.handleError(error);
   }) 
      }
      
    

  }
}
