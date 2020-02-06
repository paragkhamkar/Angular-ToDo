import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { UserAuthComponent } from '../user-auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginSuccessful: boolean;
  loginForm: FormGroup;
  email = '';
  password = '';
  success = false;

  constructor(
    private userauth: UserAuthService,
    private router: Router,
    private messageService: MessagesService,
    private todoService: TodoDataService,
    private userComponent: UserAuthComponent
  ) {
    userComponent.isLoginPage = true;
    this.messageService.deactivateSpinner();
    if (this.todoService.activeUser !== '') {
      this.router.navigate([
        '/user/' + this.todoService.activeUser + '/todo/private'
      ]);
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.min(8)])
    });
  }

  onSubmit() {
    if (
      this.loginForm.get('email').valid === true &&
      this.loginForm.get('password').valid === true
    ) {
      console.log('validdetails');
      const loginDetails = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.messageService.activateSpinner();
      this.userauth.userLogin(loginDetails);
    } else {
      this.messageService.deactivateSpinner();
      console.log('invalid details');
      //show error message
    }
  }

  validateForm() {
    return console.log(
      this.loginForm.get('email').valid && this.loginForm.get('password').valid
    );
  }
}
