import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginSuccessful:boolean;
  loginForm:FormGroup;
  email = '';
  password = '';
  success:boolean = false;

  constructor(
    private userauth:UserAuthService,
    private router:Router) { 
      userauth.checkLogin.subscribe(
        value => {
          if(value)
            router.navigate(['/user/'+localStorage.getItem('UserEmail')+'/todo/private'])
        }
      )
    
    }

  onSubmit(){
    let testA = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.userauth.userLogin(testA);

    

    console.log("ahsgcjaghcajshgcjashgcjashcgsjghc");
    // if(this.userauth.userLogin(testA)){
    //   this.router.navigate(["/user/"+localStorage.getItem("UserEmail")+"/private"])
    // }
  }

  ngOnInit() {
    if(localStorage.getItem("UserEmail")){
      this.router.navigate(["/user/"+localStorage.getItem("UserEmail")+"/todo/private"])
    }

    this.loginForm = new FormGroup(
      {
        "email": new FormControl(null,Validators.required),
        "password": new FormControl(null,Validators.required)
      }
    )
  }
}
