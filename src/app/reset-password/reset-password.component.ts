import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetpass!:FormGroup;
  

  constructor(private formbuilder:FormBuilder,private http:HttpClient,private router:Router,private route:ActivatedRoute) { }  

  ngOnInit(): void {
    this.resetpass=this.formbuilder.group({
      password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$')]],
      confirm_password:['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$')]]

    })
  }
  get password()
  {
   return this.resetpass.get('password')
  }
  get confirm_password()
  {
   return this.resetpass.get('confirm_password')
  }
 
  change(){
    const formdata=this.resetpass.getRawValue;
    const data={
      ...formdata,
      token:this.route.snapshot.paramMap.get('token')

    };
    this.http.post<any>("http://192.168.1.116:3000",data).subscribe((result)=>{
      
    alert("successfully change the password");
    this.router.navigate(['login'])
  },err=>{
      alert("somthing wrong")
    })
  }
}
