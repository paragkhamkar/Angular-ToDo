import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserdataService } from './services/userdata.service';

@NgModule({
  declarations: [UserComponent, HeaderComponent, ProfileComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
  providers: [UserdataService]
})
export class UserModule {}
