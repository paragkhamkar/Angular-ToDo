import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private userDetails:any;

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
    .subscribe(this.getUserDetails, this.failedUserSignup)
    
    
  }

  userKey:any;

  getUserDetails(userRecords){
    let activeUser = localStorage.getItem('UserEmail');
    for(let user=0; user<userRecords.userEmail.length; user++){
        if(userRecords.userEmail[user] == activeUser){
          localStorage.setItem("USER_KEY",userRecords.userKey[user]);
          this.router.navigate(['/user/'+localStorage.getItem('UserEmail')+' /todo/private'])
          break;
        }
    }
  }

  commander(){
    this.http.get("https://angular-todo-2f483.firebaseio.com/users/"+localStorage.getItem('USER_KEY')+".json")
    .subscribe(this.setLocalStorage, this.failedUserSignup)
  }


  setLocalStorage(userData){
    localStorage.setItem("UserDetails", JSON.stringify(userData));
  }

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
    userRecords.userKey.push(userKey.name);
    return this.http
    .put("https://angular-todo-2f483.firebaseio.com/userRecords.json",userRecords)
    .subscribe(
      resolve => {
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
