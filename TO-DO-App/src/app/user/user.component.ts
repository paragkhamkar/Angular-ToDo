import { Component, OnInit, DoCheck } from '@angular/core';
import { UserAuthService } from '../shared/services/user-auth.service';
import { Router } from '@angular/router';
import { TodoDataService } from '../shared/services/todo-data.service';
import { MessagesService } from '../shared/services/messages.service';
import { TodoFilterService } from '../shared/services/todo-filter.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

 
 
constructor(private userService:UserAuthService,
            private todoService:TodoDataService,
            private messageService: MessagesService,
            private todoFilter:TodoFilterService,
            private router:Router){
  if(localStorage.getItem('localId') == "")
      router.navigate(['/auth/login'])
  else{
    todoService.activeUser = localStorage.getItem('localId')
    todoService.getTodos();
    userService.getUserDetails(localStorage.getItem('localId'));
    router.navigate(['/user/'+localStorage.getItem('localId')+'/todo/private'])
  }
}

ngOnInit(){
  this.messageService.infoMessage("Fetching Todo Items");
  this.messageService.deactivateSpinner();
}
}

