import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from } from 'rxjs';
// import { resolve } from 'path';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  private isUserNameAvailable(userName){
    if(localStorage.getItem(userName))
      return false;
    else
      return true;
  }

  addNewUser(userObject){
    if(this.isUserNameAvailable(userObject.userName)){
      localStorage.setItem(userObject.userName, JSON.stringify(userObject))
      console.log("User Added");
    }
    else
      console.log("Use Another UserName")
  }


  saveUserDetails(){}
  getUserDetails(){}

}
  // userData;
  // usersKey:any;
  // userRegistered = false;
  // userAdded = false;
  // constructor(private http: HttpClient) { }

  // // const API_KEY = "AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I";

  // async signUp(userData){
  //   this.userData = userData;
  //   let f1 = await this.test1();
  //   console.log("f1");
  //   console.log(f1);
  //   let f2 = await this.test2();
  //   console.log("f2");
  //   console.log(f2);
  //   let f3 = await this.test3();
  //   console.log("f3");
  //   console.log(f3);
  // }

  // test1(){
  //   return this.http.post(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I",
  //     {
  //       email: this.userData.email,
  //       password:	this.userData.password,
  //       returnSecureToken: "true"
  //     }
  //   ).subscribe(
  //     resolve => {
  //       this.userRegistered = true;
  //       console.log("Added User in Auth")
  //     },
  //     error => {
  //       this.userRegistered = false;
  //       console.log("Unable To Add user to Auth")
  //     }
  //   )
  // }

  // test2(){
  //   return this.http.post<string>(
  //     "https://angular-todo-2f483.firebaseio.com/userData.json",this.userData)
  //     .subscribe(
  //       result =>{ 
  //           this.usersKey = result;
  //           this.userAdded = true;
  //           console.log("Added User Details To Firebase")
  //       },
  //       err => {
  //         this.userAdded = false
  //         console.log("Unable to add details to firebase")
  //       }
  //     )
  // }

  // test3(){
  //   return this.http
  //   .put("https://angular-todo-2f483.firebaseio.com/userData/"+this.usersKey.name+".json",
  //     {Hello : "This value has been updated"}
  //   )
  //   .subscribe(
  //     resolve => {
  //       console.log("Updated Details");
  //       console.log(resolve);
  //     },
  //     err => {
  //       console.log("Error during Update");
  //       console.log(err);
  //     }
  //   )
  // }

  // // getDetails(){
  // //   return this.http.get("https://angular-todo-2f483.firebaseio.com/users/-LydHCTbZXl6BoAut6Im/email.json")
  // // }

  // setUser(key, userData){
  //   return this.http.post(
  //     "https://angular-todo-2f483.firebaseio.com/"+key+".json",userData
  //   )
  // }

