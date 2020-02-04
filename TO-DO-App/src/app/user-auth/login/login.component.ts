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
  defaultErrorMessages = [
    'EMAIL_NOT_FOUND',
    'INVALID_PASSWORD',
    'USER_DISABLED'
  ];

  constructor(
    private userauth: UserAuthService,
    private router: Router,
    private messageService: MessagesService,
    private todoService: TodoDataService,
    private test: UserAuthComponent
  ) {
    test.isLoginPage = true;
    this.messageService.deactivateSpinner();
  }

  ngOnInit() {
    this.messageService.deactivateSpinner();
    if (this.todoService.activeUser !== '') {
      this.router.navigate([
        '/user/' + this.todoService.activeUser + '/todo/private'
      ]);
    }

    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const loginDetails = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.messageService.activateSpinner();
    this.userauth.userLogin(loginDetails);
  }
}
