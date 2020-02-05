import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { Subject } from 'rxjs';
import { MessagesService } from './messages.service';
import { TodoDataService } from './todo-data.service';
import { LoginResponse, UserDetails, SignupRespose } from '../data.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
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
    private todoService: TodoDataService
  ) {}

  signupUser(userData) {
    this.messageService.activateSpinner();
    this.messageService.successMessage('Registration Process Started');
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.API_KEY,
        {
          email: userData.email,
          password: userData.password,
          returnSecureToken: 'true'
        }
      )
      .subscribe(
        (response: SignupRespose) => {
          this.messageService.successMessage(
            'Email ID Available .. Adding User To Database'
          );
          this.addUser(response, userData);
        },
        err => {
          this.showError(err);
        }
      );
  }

  addUser(response: SignupRespose, userData: UserDetails) {
    return this.http
      .put(
        'https://angular-todo-2f483.firebaseio.com/users/' +
          response.localId +
          '.json',
        userData
      )
      .subscribe(
        resolve => {
          this.messageService.successMessage('SignUp Successful');
          this.router.navigate(['/auth/login']);
        },
        err => {
          this.showError(err);
        }
      );
  }

  userLogin(userCredentials: { email: string; password: string }) {
    localStorage.clear();
    this.todoService.activeUser = '';
    this.userDetails = null;
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I',
        {
          email: userCredentials.email,
          password: userCredentials.password,
          returnSecureToken: 'true'
        }
      )
      .subscribe(
        (response: LoginResponse) => {
          localStorage.setItem('localId', response.localId);
          this.router.navigate(['/user/' + response.localId + '/todo/private']);
        },
        err => {
          this.showError(err);
        }
      );
  }

  getUserDetails(id) {
    return this.http
      .get('https://angular-todo-2f483.firebaseio.com/users/' + id + '.json')
      .subscribe(
        (result: UserDetails) => {
          if (result === null) {
            localStorage.clear();
            alert('Local Storage Manipulated .. Logging you out');
            this.router.navigate(['/auth/login']);
            this.isValidUser = 'invalid';
          } else {
            this.isValidUser = 'valid';
            this.userDetails = result;
            this.getUserInfo.next(this.userDetails);
          }
        },
        err => {
          this.showError(err);
          return false;
        }
      );
  }

  fetchUser() {
    this.getUserInfo.next(this.userDetails);
  }

  saveChanges(user) {
    this.userDetails = user;
    return this.http
      .put(
        'https://angular-todo-2f483.firebaseio.com/users/' +
          this.todoService.activeUser +
          '.json',
        this.userDetails
      )
      .subscribe(
        resolve => {
          this.messageService.successMessage('Changes Saved Successfully');
          this.router.navigate([
            '/user',
            localStorage.getItem('localId'),
            'todo',
            'private'
          ]);
        },
        err => {
          this.showError(err);
        }
      );
  }

  showError(error) {
    console.log(this.defaultErrorMessages[error.error.error.message]);
    this.messageService.errorMessage(
      this.defaultErrorMessages[error.error.error.message]
    );
    this.messageService.deactivateSpinner();
  }
}
