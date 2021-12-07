import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ServerService } from '../service/server.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isValidloginform = true;
  constructor(private formbuilder: FormBuilder, private http: HttpClient, private userdata:ServerService,private router: Router, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$')]],
    })
  }
  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }
  login() {
    this.isValidloginform = false;
    if (this.loginForm.invalid) {
      return;
    }
    else {

      this.userdata.logindata(this.loginForm.value).subscribe((result) => {
        console.log(result)

        if (result.status === "Success") {
          alert(result.mesg)
          sessionStorage.setItem("username",result.data.username)
         
          sessionStorage.setItem('loggedUser', this.loginForm.value.email);

          this.router.navigate(['home'])
        }
        else if (result.status === "Error") {
          alert(result.mesg)
        }
      },  (error) => {
        this.router.navigate(['404']);
      }
      )
    }
  }

}