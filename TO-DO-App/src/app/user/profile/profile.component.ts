import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthComponent } from 'src/app/user-auth/user-auth.component';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile:FormGroup;
  imageURL:string | ArrayBuffer = "../../../assets/angular.svg";
  selectedGender:string;
  userDetails;
  constructor(private router:Router,
              private authService:UserAuthService,
              private messageService:MessagesService) {
      if(authService.userDetails)
        this.userDetails = authService.userDetails;
      else{
        messageService.errorMessage('Unbale To Fetch Details .. Try After Some Time')
        router.navigate(['/user/'+localStorage.getItem('localId')+'/todo/private'])
      }
   }

  goBack(){
    this.router.navigate(['/user',localStorage.getItem('localId'),'todo','private'])
  }
  ngOnInit() {
    this.imageURL = this.userDetails.userImage;

    console.log(this.imageURL)
    this.profile = new FormGroup(
      {
        "userName": new FormControl(this.userDetails.userName,[Validators.required, Validators.minLength(3)]),
        "email": new FormControl(this.userDetails.email,[Validators.required, Validators.email]),
        "firstName": new FormControl(this.userDetails.firstName,[Validators.required , Validators.minLength(3)]),
        "lastName": new FormControl(this.userDetails.lastName,[Validators.required, Validators.minLength(3)]),
        "gender": new FormControl(this.userDetails.gender),
        "address": new FormControl(this.userDetails.address),
        "userImage": new FormControl(null)
      }
    )
    this.imageURL = this.userDetails.userImage ? this.userDetails.userImage : "../../../assets/angular.svg";
  }

  selectGender(gender:HTMLInputElement){
    this.selectedGender = gender.value;
    gender.checked = true;
  }

  onSubmit(){
    if(this.profile.valid){
      let userDetails = {
      userName: this.profile.value.userName,
      email: this.profile.value.email,
      password : this.profile.value.password,
      firstName: this.profile.value.firstName,
      lastName: this.profile.value.lastName,
      gender: this.selectedGender == '' ? this.profile.value.gender:this.selectedGender,
      address : this.profile.value.address,
      userImage: this.imageURL
    };
      this.authService.saveChanges(userDetails);
    }
    else
      this.messageService.errorMessage("Fill All the Required Details Correctly")
  }

  setImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      console.log(reader);
      reader.readAsDataURL(event.target.files[0]);
      console.log(reader)
      reader.onload = (event) => {
        this.imageURL = reader.result;
      }
    }
  }

}
