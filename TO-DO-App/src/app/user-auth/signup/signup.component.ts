import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
// import { getMaxListeners } from 'cluster';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;

  imageURL:any = "../../../assets/angular.svg";

  constructor(private authService:UserAuthService) { }

  onSubmit(){
    console.log("Clicked Submit on User SignUp Form");
      
      let testA = {
      userName: this.signupForm.value.userName,
      email: this.signupForm.value.email,
      password : this.signupForm.value.password,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      gender: this.signupForm.value.gender,
      address : this.signupForm.value.address,
      userImage: this.imageURL
    };

    console.log("Fetched User Signup data From Form");
    console.log("Created Object for new user");
    console.log(testA);

      this.authService.userSignup(testA);
    }

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        "userName": new FormControl(null,Validators.required),
        "email": new FormControl(null,[Validators.required, Validators.email]),
        "password": new FormControl(null,Validators.required),
        "rePassword": new FormControl(null,Validators.required),
        "firstName": new FormControl(null,Validators.required),
        "lastName": new FormControl(null,Validators.required),
        "gender": new FormControl(null),
        "address": new FormControl(null),
        "userImage": new FormControl(null)
      }
    )
  }

  test(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      console.log(reader);
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader)
      reader.onload = (event) => {
        this.imageURL = reader.result;
      }
    }
  }
}
