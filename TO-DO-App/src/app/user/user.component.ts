import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../shared/services/user-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

 
 
constructor(private userService:UserAuthService){}

ngOnInit(){
  console.log("Inside User Component")
  this.userService.commander()
}
}
