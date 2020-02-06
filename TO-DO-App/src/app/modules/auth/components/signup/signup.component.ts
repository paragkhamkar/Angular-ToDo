import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { SignupRespose } from 'src/app/shared/data.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  selectedGender = 'Female';
  imageURL: string | ArrayBuffer = '../../../assets/angular.svg';
  signupSubscription: Subscription;
  addUserSubscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private messageService: MessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl(null),
      address: new FormControl(null),
      userImage: new FormControl(null)
    });
  }

  setImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      console.log(reader);
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader);
      reader.onload = () => {
        this.imageURL = reader.result;
      };
    }
  }

  selectGender(gender: HTMLInputElement) {
    this.selectedGender = gender.value;
    gender.checked = true;
  }

  onSubmit() {
    this.messageService.activateSpinner();
    if (this.signupForm.valid) {
      if (this.signupForm.value.password !== this.signupForm.value.rePassword) {
        this.messageService.errorMessage("Passwords didn't matched");
        this.messageService.deactivateSpinner();
        return false;
      }
      const userDetails = {
        userName: this.signupForm.value.userName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        gender: this.selectedGender,
        address: this.signupForm.value.address,
        userImage: this.imageURL
      };
      this.doSignup(userDetails);
    } else {
      this.messageService.errorMessage(
        'Fill All the Required Details Correctly'
      );
      this.messageService.deactivateSpinner();
    }
  }
  doSignup(userDetails) {
    this.signupSubscription = this.authService
      .signupUser(userDetails)
      .subscribe(
        (response: SignupRespose) => {
          this.messageService.successMessage(
            'Email ID Available .. Adding User To Database'
          );
          this.addUser(response, userDetails);
        },
        err => {
          this.authService.showError(err);
        }
      );
  }
  addUser(response, userDetails) {
    this.addUserSubscription = this.authService
      .addUser(response, userDetails)
      .subscribe(
        resolve => {
          this.messageService.deactivateSpinner();
          this.messageService.successMessage('SignUp Successful');
          this.router.navigate(['/auth/login']);
        },
        err => {
          this.authService.showError(err);
        }
      );
  }
  ngOnDestroy() {
    this.addUserSubscription.unsubscribe();
    this.signupSubscription.unsubscribe();
  }
}
