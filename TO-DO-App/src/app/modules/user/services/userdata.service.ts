import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable()
export class UserdataService {
  showError(err: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient, private userService: UserService) {}

  getUserDetails() {
    return this.http.get(
      'https://angular-todo-2f483.firebaseio.com/users/' +
        this.userService.getUserId() +
        '.json'
    );
  }

  saveChanges(user) {
    this.userService.setUserDetails(user);
    return this.http.put(
      'https://angular-todo-2f483.firebaseio.com/users/' +
        this.userService.getUserId() +
        '.json',
      user
    );
  }
}
