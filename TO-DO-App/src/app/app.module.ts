import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { SignupComponent } from './user-auth/signup/signup.component';
import { LoginComponent } from './user-auth/login/login.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { TodoComponent } from './user/todo/todo.component';
import { PublicComponent } from './user/todo/public/public.component';
import { PrivateComponent } from './user/todo/private/private.component';
import { NewTodoComponent } from './user/todo/new-todo/new-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    SignupComponent,
    LoginComponent,
    UserComponent,
    ProfileComponent,
    TodoComponent,
    PublicComponent,
    PrivateComponent,
    NewTodoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
