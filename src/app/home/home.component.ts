import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
    userDisplayName:any = '';
    ngOnInit() {
     this.userDisplayName = localStorage.getItem('username');
     console.log(localStorage.getItem('username'));


    }
    logout()
    {
      
      this.router.navigate(['login']);
      window.localStorage.clear();
      localStorage.removeItem('username');

      


    }
}

