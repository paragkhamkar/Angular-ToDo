import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserDetails } from '../data.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }

  saveChanges(userDetails) {
    throw new Error('Method not implemented.');
  }

  userDetails = null;
  userDetailsChanged = new Subject<UserDetails>();

  setUserDetails(data) {
    this.userDetails = data;
    this.userDetailsChanged.next(this.userDetails);
  }

  getUserDetails() {
    return this.userDetails;
  }

  getUserId() {
    return localStorage.getItem('localId');
  }

  setUserId(id) {
    localStorage.setItem('localId', id);
  }
}
