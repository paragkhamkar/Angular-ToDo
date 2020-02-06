import { Injectable } from '@angular/core';
import {
  UserDetails,
  SignupRespose,
  LoginResponse
} from 'src/app/shared/data.model';
import { Subject } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  userDetails: UserDetails;
  getUserInfo = new Subject<UserDetails>();
  isValidUser = 'fetching';
  private API_KEY = 'AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I';

  defaultErrorMessages = {
    EMAIL_NOT_FOUND: 'Email Address doesnot exist .. try to signup',
    INVALID_PASSWORD: 'You Have Entered Invalid Password',
    INVALID_EMAIL: 'Please Enter Valid Email Address',
    USER_DISABLED: 'Login disabled for security reasons',
    EMAIL_EXISTS: 'Email Exist .. Try to Login or change Email',
    OPERATION_NOT_ALLOWED: 'Server not accepting request for now',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many attempt noticed .. try again later'
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessagesService,
    private userService: UserService
  ) {}

  signupUser(userData) {
    this.messageService.activateSpinner();
    this.messageService.successMessage('Registration Process Started');
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        this.API_KEY,
      {
        email: userData.email,
        password: userData.password,
        returnSecureToken: 'true'
      }
    );
  }

  addUser(response: SignupRespose, userData: UserDetails) {
    return this.http.put(
      'https://angular-todo-2f483.firebaseio.com/users/' +
        response.localId +
        '.json',
      userData
    );
  }

  userLogin(userCredentials: { email: string; password: string }) {
    localStorage.clear();
    this.userDetails = null;
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I',
      {
        email: userCredentials.email,
        password: userCredentials.password,
        returnSecureToken: 'true'
      }
    );
  }

  fetchUser() {
    this.getUserInfo.next(this.userDetails);
  }

  showError(error) {
    this.messageService.errorMessage(
      this.defaultErrorMessages[error.error.error.message]
    );
    this.messageService.deactivateSpinner();
  }
}
