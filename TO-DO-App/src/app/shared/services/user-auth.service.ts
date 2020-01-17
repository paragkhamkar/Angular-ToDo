import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private userDetails:any;
  loginSuccessful = false;
  checkLogin = new Subject<boolean>()

  constructor(
                private http:HttpClient,
                private router:Router,
                private route:ActivatedRoute) { }

  private getToken(){
    return localStorage.getItem("UserKey");
  }

  private seeDetails(data){
    console.log("Inside See Details")
    console.log(data)
    return true;
  }

  userLogin(userCredentials:{email:string, password:string}){
    localStorage.clear();
    console.log("Inside user Login");
    console.log(userCredentials);
    return this.http.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I",
      {
        email: userCredentials.email,
        password:	userCredentials.password,
        returnSecureToken: "true"
      }
    ).subscribe(resolve => this.getDetails(resolve), this.failedUserSignup);
  }

  getDetails(resolve){
    localStorage.setItem("authKey",resolve.idToken);
    localStorage.setItem("UserEmail",resolve.email);
    
    this.http.get("https://angular-todo-2f483.firebaseio.com/userRecords.json")
    .subscribe(
      (userRecords:any) => {
        let activeUser = localStorage.getItem('UserEmail');
        for(let user=0; user<userRecords.userEmail.length; user++){
            if(userRecords.userEmail[user] == activeUser){
              localStorage.setItem("USER_KEY",userRecords.userKey[user]);
              this.router.navigate(['user/'+userRecords.userEmail[user]+'/todo/private'])
              break;
            }
        }
      }, this.failedUserSignup)
    
    
  }

  getUserDetails(userRecords){
    let activeUser = localStorage.getItem('UserEmail');
    for(let user=0; user<userRecords.userEmail.length; user++){
        if(userRecords.userEmail[user] == activeUser){
          localStorage.setItem("USER_KEY",userRecords.userKey[user]);
          this.loginSuccessful = true;
          this.checkLogin.next(this.loginSuccessful);
          break;
        }
    }
  }

  gotoDashboard(){
    this.router.navigate(['/user/'+localStorage.getItem('UserEmail')+' /todo/private'])
  }

  commander(){
    this.http.get("https://angular-todo-2f483.firebaseio.com/users/"+localStorage.getItem('USER_KEY')+".json")
    .subscribe(this.setLocalStorage, this.failedUserSignup)
  }


  setLocalStorage(userData){
    localStorage.setItem("UserDetails", JSON.stringify(userData));
  }

  userSignup(userData){
    console.log("User Signup Service Called");
    console.log("Recived User Data As Argument : ");
    console.log(userData);
    this.userDetails = userData;
    console.log("Sending HTTP Post Request to Authentication API for Signup");
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
    console.log("Resolved Authentication for Signup");
    console.log("Add User Method Called");
    console.log("Sending HTTP Post Request for Adding User Details In DB");
    return this.http.post("https://angular-todo-2f483.firebaseio.com/users.json",this.userDetails)
    .subscribe(resolve => this.getUserRecords(resolve), this.failedUserSignup) 
  }

  getUserRecords(userKey){
    console.log("Resolved & Added To DB");
    console.log("Get User Records Method Called");
    console.log("Sending HTTP GET Request for getting user records");
    return this.http.get("https://angular-todo-2f483.firebaseio.com/userRecords.json")
    .subscribe(
      resolve => this.setUserRecord(resolve, userKey), this.failedUserSignup)
  }

  setUserRecord(userRecords:any , userKey){
    console.log("Resolved $ Received User Records");
    console.log(userRecords);
    console.log("Set User Record Method Called");
    if(userRecords == undefined){
    console.log("User Records is Empty");
      userRecords = {};
      userRecords.userEmail = [];
      userRecords.userKey = []
    }
    console.log("Pushing new user to User Records");
    userRecords.userEmail.push(this.userDetails.email);
    userRecords.userKey.push(userKey.name);
    return this.http
    .put("https://angular-todo-2f483.firebaseio.com/userRecords.json",userRecords)
    .subscribe(
      resolve => {
        console.log("Resolved & Set Key to Local Storage");
        sessionStorage.setItem("signup successfull", "true");
        this.router.navigate(['/auth/login'])
      },
      this.failedUserSignup
    );
  }

  failedUserSignup(err){
    console.log("Failed To Signup")
    console.log(err)
  }
}
