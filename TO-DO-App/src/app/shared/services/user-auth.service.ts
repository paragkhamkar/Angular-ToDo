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
export class UserAuthService{
  userDetails:UserDetails;
  private API_KEY = 'AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I';

  constructor(private http:HttpClient,
            private router:Router,
            private messageService:MessagesService,
            private todoService:TodoDataService) { }
  
  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav)
  }

  preventNav(){
    alert("Dont Play With URL")
  }

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  }

  signupUser(userData){
    this.messageService.activateSpinner();
    this.messageService.successMessage("Registration Process Started");
    this.userDetails = userData;
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.API_KEY,{
            email: userData.email,
            password:	userData.password,
            returnSecureToken: "true"
          }
        ).subscribe(
          (response:SignupRespose) => {
            this.addUser(response)
          },
          err =>{
            this.showError(err);
          } );
  }

  addUser(response:SignupRespose){
    return this.http.put("https://angular-todo-2f483.firebaseio.com/users/"+response.localId+".json",this.userDetails)
    .subscribe(
      resolve => {
        this.messageService.successMessage("SignUp Successful");
        this.router.navigate(['/auth/login'])
      }, 
      (err) => {
        this.showError(err);
      }); 
  }

  userLogin(userCredentials:{email:string, password:string}){
    localStorage.clear();
    this.todoService.activeUser = ""
    this.userDetails = null;
    return this.http.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDm11ltHEGq2trpZp0LsK1Pi5dKiq18d4I",
      {
        email: userCredentials.email,
        password:	userCredentials.password,
        returnSecureToken: "true"
      }
    ).subscribe(
      (resopnse:LoginResponse) => {
          sessionStorage.setItem('localId', resopnse.localId)
          this.todoService.activeUser = userCredentials.email;
          this.getUserDetails(resopnse)
        },
      (err) => {
        this.showError(err);
      });
  }

  getUserDetails(response){
    this.todoService.activeUser = response.localId;
    this.router.navigate(['/user/'+response.localId+'/todo/private']);
    this.http.get("https://angular-todo-2f483.firebaseio.com/users/"+response.localId+".json")
    .subscribe(
      (result:UserDetails) => {
        this.userDetails = result;
        this.messageService.successMessage("Welcome Back")
      }, 
      (err) => {
        this.showError(err);
    });
  }

  saveChanges(user){
    this.userDetails = user;
    return this.http.put("https://angular-todo-2f483.firebaseio.com/users/"+this.todoService.activeUser+".json",this.userDetails)
    .subscribe(
      (resolve) => {
        this.messageService.successMessage("Changes Saved Successfully");
        this.router.navigate(['../'])
      }, 
      (err) => {
        this.showError(err);
      }); 

  }

  showError(error){
    console.log("Error Occurred")
    console.log(error);
    this.messageService.errorMessage(error.error.error.message);
    this.messageService.deactivateSpinner();
  }
}
