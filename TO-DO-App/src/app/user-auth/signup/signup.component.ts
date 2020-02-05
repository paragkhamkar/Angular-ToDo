import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { UserAuthComponent } from '../user-auth.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  selectedGender = 'Female';
  imageURL: string | ArrayBuffer = '../../../assets/angular.svg';

  constructor(
    private authService: UserAuthService,
    private messageService: MessagesService,
    private userComponent: UserAuthComponent
  ) {
    userComponent.isLoginPage = false;
  }

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
    if (this.signupForm.valid) {
      if (this.signupForm.value.password !== this.signupForm.value.rePassword) {
        this.messageService.errorMessage("Passwords didn't matched");
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
      this.authService.signupUser(userDetails);
    } else {
      this.messageService.errorMessage(
        'Fill All the Required Details Correctly'
      );
    }
  }
}
