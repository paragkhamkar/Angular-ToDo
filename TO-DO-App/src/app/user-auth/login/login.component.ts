import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';


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
    private router:Router,
    private messageService:MessagesService) { }

  ngOnInit() {
    this.messageService.deactivateSpinner();
    if(localStorage.getItem("localId")){
      this.router.navigate(["/user/"+localStorage.getItem('localId')+"/todo/private"])
    }

    this.loginForm = new FormGroup(
      {
        "email": new FormControl(null,Validators.required),
        "password": new FormControl(null,Validators.required)
      }
    )
  }

  onSubmit(){
    let loginDetails = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.messageService.activateSpinner();
    this.userauth.userLogin(loginDetails);
  }
}
