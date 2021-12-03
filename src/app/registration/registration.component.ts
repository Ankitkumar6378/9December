import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import{HttpClient} from'@angular/common/http'
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';



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
    email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    mobile:['',[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
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
      if(result.status==="Success")
      {
        alert(result.mesg)
        this.router.navigate(['login'])
      }
      else if(result.status==="Error")
      {
        alert(result.mesg)
      }
     
    
   },(error) => {
      this.errorHandler.handleError(error);
   }) 
      }
      
    

  }
}
