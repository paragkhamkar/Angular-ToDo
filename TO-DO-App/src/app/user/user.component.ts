import { Component, OnInit, DoCheck } from '@angular/core';
import { UserAuthService } from '../shared/services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, DoCheck {

 
 
constructor(private userService:UserAuthService,
            private router:Router){
  if(!localStorage.getItem("UserEmail"))
      router.navigate(['/auth/login'])
}

ngOnInit(){
  console.log("Inside User Component")
  this.userService.commander()
}

ngDoCheck(){
  // console.log("User ngDoCheck")
  // if(!localStorage.getItem("UserEmail")){
  //   console.log("Something Went Wrong, Logging you out")
  //   this.router.navigate(['/auth/login'])
  // }
      
}
}

