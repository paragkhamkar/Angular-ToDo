import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginResponse, UserDetails } from 'src/app/shared/data.model';

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
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService,
    private messageService: MessagesService
  ) {}

  ngOnInit() {
    if (this.userService.getUserId()) {
      this.router.navigate(['todo', 'list', 'private']);
      return false;
    }
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.min(8)])
    });
  }

  onSubmit() {
    this.messageService.activateSpinner();
    if (
      this.loginForm.get('email').valid === true &&
      this.loginForm.get('password').valid === true
    ) {
      const loginDetails = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.login(loginDetails);
    } else {
      this.messageService.deactivateSpinner();
      this.messageService.errorMessage('Please Enter Valid Details');
    }
  }

  login(loginDetails) {
    this.authService.userLogin(loginDetails).subscribe(
      (response: LoginResponse) => {
        this.messageService.deactivateSpinner();
        this.userService.setUserId(response.localId);
        this.router.navigate(['todo', 'list', 'private']);
      },
      err => {
        this.authService.showError(err);
      }
    );
  }
}
