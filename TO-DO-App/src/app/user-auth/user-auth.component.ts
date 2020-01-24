import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../shared/services/todo-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor(private todoService:TodoDataService,
              private router:Router) {
    if(todoService.activeUser != "")
        router.navigate(['/user'])

   }

  isLoginPage = true;
  ngOnInit() {
  }

}
