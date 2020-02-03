import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../shared/services/todo-data.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MessagesService } from '../shared/services/messages.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  isLoginPage = true;
  switchPage: Subject<boolean>;

  constructor(
    private todoService: TodoDataService,
    private router: Router,
    message: MessagesService
  ) {
    if (localStorage.getItem('localId') == null) {
      router.navigate(['/auth/login']);
    } else {
      message.successMessage('Redirecting to Dashboard');
      router.navigate([
        '/user/' + localStorage.getItem('localId') + '/todo/private'
      ]);
    }
  }

  ngOnInit() {}
}
