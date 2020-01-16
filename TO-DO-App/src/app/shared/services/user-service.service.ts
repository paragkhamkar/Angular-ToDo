import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  userDetails:any;

  constructor(private http: HttpClient) { }

  userSignup(userData){
    console.log("Inside UserSignup");
    this.userDetails = userData;
    return this.http.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I",
          {
            email: userData.email,
            password:	userData.password,
            returnSecureToken: "true"
          }
        ).subscribe(resolve => this.addUser(resolve), this.failedUserSignup);
  }

  addUser(token){
    console.log("Inside addUser");
    console.log(token);
    return this.http.post("https://angular-todo-2f483.firebaseio.com/users.json",this.userDetails)
    .subscribe(resolve => this.getUserRecords(resolve), this.failedUserSignup) 
  }

  getUserRecords(userKey){
    console.log("Inside getUserRecords");
    return this.http.get("https://angular-todo-2f483.firebaseio.com/userRecords.json")
    .subscribe(
      resolve => this.setUserRecord(resolve, userKey), this.failedUserSignup)
  }

  setUserRecord(userRecords:any , userKey){
    console.log("Inside setRecords");
    if(userRecords == undefined){
      userRecords = {};
      userRecords.userEmail = [];
      userRecords.userKey = []
    }
    userRecords.userEmail.push(this.userDetails.email);
    userRecords.userKey.push(userKey);
    return this.http
    .put("https://angular-todo-2f483.firebaseio.com/userRecords.json",userRecords)
    .subscribe();
  }

  failedUserSignup(err){
    console.log("Failed To Signup")
    console.log(err)
  }
}
