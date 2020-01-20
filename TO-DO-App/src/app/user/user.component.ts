import { Component, OnInit, DoCheck } from '@angular/core';
import { UserAuthService } from '../shared/services/user-auth.service';
import { Router } from '@angular/router';
import { TodoDataService } from '../shared/services/todo-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

 
 
constructor(private userService:UserAuthService,
            private todoService:TodoDataService,
            private router:Router){
  if(!localStorage.getItem("UserEmail"))
      router.navigate(['/auth/login'])
}

ngOnInit(){
  console.log("Inside User Component")
  this.userService.commander()
}

}

