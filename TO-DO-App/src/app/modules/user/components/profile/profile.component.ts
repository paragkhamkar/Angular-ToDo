import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDetails } from 'src/app/shared/data.model';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UserdataService } from '../../services/userdata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: FormGroup;
  imageURL: string | ArrayBuffer = '../../../assets/angular.svg';
  userDetails: UserDetails;
  userFetched = false;
  selectedGender = '';

  constructor(
    private router: Router,
    private messageService: MessagesService,
    private userService: UserService,
    private userDataService: UserdataService
  ) {
    this.userFetched = false;
    messageService.activateSpinner();

    if (userService.getUserDetails() != null) {
      this.userDetails = userService.getUserDetails();
      this.userFetched = true;
      this.loadDetails();
      messageService.deactivateSpinner();
    } else {
      userService.userDetailsChanged.subscribe(value => {
        this.userDetails = value;
        this.userFetched = true;
        this.loadDetails();
        messageService.deactivateSpinner();
      });
      messageService.infoMessage('Fetching Details .. wait for some time');
    }
  }

  goBack() {
    this.router.navigate([
      '/user',
      localStorage.getItem('localId'),
      'todo',
      'private'
    ]);
  }

  loadDetails() {
    this.imageURL = this.userDetails.userImage;
    this.profile = new FormGroup({
      userName: new FormControl(
        { value: this.userDetails.userName, disabled: true },
        [Validators.required, Validators.minLength(3)]
      ),
      email: new FormControl(
        { value: this.userDetails.email, disabled: true },
        [Validators.required, Validators.email]
      ),
      firstName: new FormControl(this.userDetails.firstName, [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl(this.userDetails.lastName, [
        Validators.required,
        Validators.minLength(3)
      ]),
      gender: new FormControl(this.userDetails.gender),
      address: new FormControl(this.userDetails.address),
      userImage: new FormControl(null)
    });
    this.imageURL = this.userDetails.userImage
      ? this.userDetails.userImage
      : '../../../assets/angular.svg';
  }
  ngOnInit() {}

  selectGender(gender: HTMLInputElement) {
    this.selectedGender = gender.value;
    gender.checked = true;
  }

  onSubmit() {
    if (this.profile.valid) {
      const userDetails = {
        userName: this.userDetails.userName,
        email: this.userDetails.email,
        password: this.userDetails.password,
        firstName: this.profile.value.firstName,
        lastName: this.profile.value.lastName,
        gender:
          this.selectedGender === ''
            ? this.userDetails.gender
            : this.selectedGender,
        address: this.profile.value.address,
        userImage: this.imageURL
      };
      this.saveChanges(userDetails);
    } else {
      this.messageService.errorMessage(
        'Fill All the Required Details Correctly'
      );
    }
  }

  saveChanges(userDetails) {
    this.userDataService.saveChanges(userDetails).subscribe(
      resolve => {
        this.messageService.successMessage('Changes Saved Successfully');
        this.router.navigate(['todo', 'list', 'private']);
      },
      err => {
        this.userDataService.showError(err);
      }
    );
  }

  setImage(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imageURL = reader.result;
      };
    }
  }
}
