import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ServerService } from '../service/server.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetpass!: FormGroup;


  constructor(private formbuilder: FormBuilder, private userdata: ServerService, private http: HttpClient, private router: Router, private route: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {


    this.resetpass = this.formbuilder.group({

      otp: ['', [Validators.required]],

      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$')]],
    })

  }



  get password() {
    return this.resetpass.get('password')
  }
 
  get otp() {
    return this.resetpass.get('otp')
  }

  change() {
    if (!this.resetpass.valid) {
      return this.resetpass.markAllAsTouched()
    }
    else {
      //process you request

      this.userdata.resetdata(this.resetpass.value).subscribe((result) => {
        if (result.status === "Success") {
          alert(result.mesg)
          this.router.navigate(['login'])
        }
        else if (result.status === "Error") {
          alert(result.mesg)
        }
      }, (error) => {
        this.errorHandler.handleError(error);
      })
    }
  }
}
