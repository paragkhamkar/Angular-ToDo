import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/shared/services/user-service.service';
// import { getMaxListeners } from 'cluster';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;

  imageURL:any = "../../../assets/angular.svg";

  constructor(private authService:UserServiceService) { }

  testA = {};

  onSubmit(){
      this.testA = {
      userName: this.signupForm.value.userName,
      email: this.signupForm.value.email,
      password : this.signupForm.value.password,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      gender: this.signupForm.value.gender,
      address : this.signupForm.value.address,
      userImage: this.imageURL,
      todo: [],
      todoId: -1
    };

    this.authService.addNewUser(this.testA)

    // this.authService.signUp(this.testA)
    // // console.log(this.signupForm)
    // // console.log(this.signupForm.value.email +""+this.signupForm.value.password);

    // // let testcase = {
    // //   usernames:['hello','bye'],
    // //   email:['hello@getMaxListeners.com', 'bye@getMaxListeners.com']
    // // }
    // // let p = this.authService.setUser("users", testcase).subscribe(
    // //   result => console.log(result),
    // //   err => console.log(err)
    // // )
    
    // let t1:any = 5;
    // // let test = this.authService.getDetails().subscribe(
    //   // result =>  console.log(result),
    //   // err => console.log(err)
    // // );
    // // console.log(test)
    //   let a = 5;
    //   let b = 10;
    }

    addUser(){

    }

    // let test = this.authService.setUser("users", testcase).subscribe()

    // let test = this.authService
    //           .signUp(testA.email, testA.password)
    //           .subscribe(
    //             (resultData) => {
    //               this.authService
    //               .setUser(testA)
    //               .subscribe(
    //                 res=>{console.log(res)},
    //                 err=>{console.log(err)}
    //               )
    //               console.log(resultData);
    //             },
    //             (errorData) =>{
    //               console.log("Error : "+errorData.error.error.message);
    //             }
    //           );
    // console.log(test)

  // setValue(gender){
  //   this.gender = gender.value
  //   gender.checked = true;
  // }

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
