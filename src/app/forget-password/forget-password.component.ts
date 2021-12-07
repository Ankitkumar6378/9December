import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { ServerService } from '../service/server.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetpage!: FormGroup;
  isValidforgetpage=true;


  constructor(private formbuilder: FormBuilder, private userdata:ServerService,private http: HttpClient, private router: Router, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.forgetpage = this.formbuilder.group({
      email: ['', [Validators.required]],

    })
  }
  get email() {
    return this.forgetpage.get('email')
  }
  Submit() {

    this.isValidforgetpage = false;
    if (this.forgetpage.invalid) {
      return;
    }
    else {
      //process you request
      this.isValidforgetpage = true;

      this.userdata.forgetdata(this.forgetpage.value).subscribe((result) => {
        if (result.status === "Success") {
          alert(result.mesg)
          this.router.navigate(['reset'])
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
