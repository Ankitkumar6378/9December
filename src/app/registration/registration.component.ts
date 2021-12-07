import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ServerService } from '../service/server.service';
import { FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { NameValidator } from '../namevalidator';





@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup
  public errorMessage: string = '';
  isValidFormSubmitted = true;

  nonWhitespaceRegExp: RegExp = new RegExp("\\S");

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router, private errorHandler: ErrorHandlerService, private userdata: ServerService) { }
 
  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.pattern('^(?! )[A-Za-z ]*(?<! )$')]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$')]],
    })
  }
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return (isValid ? null : { "whitespace": true });
}


  get username() {
    return this.registrationForm.get('username')
  }
  get email() {
    return this.registrationForm.get('email')
  }
  get mobile() {
    return this.registrationForm.get('mobile')
  }
  get password() {
    return this.registrationForm.get('password')
  }

  submit() {

    this.isValidFormSubmitted = false;
    if (this.registrationForm.invalid) {
      const value = this.registrationForm.value
      ;
      console.log(value);
    }

    else {
      //process you request
      this.isValidFormSubmitted = true;

      this.userdata.postdata(this.registrationForm.value).subscribe((result) => {
       
        if (result.status === "Success") {
          alert(result.mesg)
          this.router.navigate(['login'])
        }
        else if (result.status === "Error") {
          alert(result.mesg)
        }


      }, (error) => {
        this.router.navigate(['404']);

      })
    }
  }
}
