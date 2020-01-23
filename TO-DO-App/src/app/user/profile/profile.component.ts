import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthComponent } from 'src/app/user-auth/user-auth.component';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile:FormGroup;
  abcd:any = "../../../assets/angular.svg";
  userDetails;
  constructor(userData:UserAuthService) {
      this.userDetails = userData.userDetails;
   }

  ngOnInit() {
    this.abcd = this.userDetails.userImage;

    console.log(this.abcd)
    this.profile = new FormGroup(
      {
        "userName": new FormControl(this.userDetails.userName,[Validators.required, Validators.minLength(6)]),
        "email": new FormControl(this.userDetails.email,[Validators.required, Validators.email]),
        "firstName": new FormControl(this.userDetails.firstName,[Validators.required , Validators.minLength(3)]),
        "lastName": new FormControl(this.userDetails.lastName,[Validators.required, Validators.minLength(3)]),
        "gender": new FormControl(this.userDetails.gender),
        "address": new FormControl(this.userDetails.address),
        "userImage": new FormControl(null)
      }
    )
    this.abcd = this.userDetails.userImage ? this.userDetails.userImage : "../../../assets/angular.svg";
  }

  setImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      console.log(reader);
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader)
      reader.onload = (event) => {
        this.abcd = reader.result;
      }
    }
  }

}
