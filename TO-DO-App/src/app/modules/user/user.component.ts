import { Component, OnInit } from '@angular/core';
import { UserdataService } from './services/userdata.service';
import { UserDetails } from 'src/app/shared/data.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(
    private userDataService: UserdataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userDataService.getUserDetails().subscribe(
      (result: UserDetails) => {
        this.userService.setUserDetails(result);
      },
      err => {
        this.userDataService.showError(err);
      }
    );
  }
}
