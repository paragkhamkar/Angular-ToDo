import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { from } from 'rxjs';
import { HeaderComponent } from './user/header/header.component';
import { LeftMenuComponent } from './user/todo/left-menu/left-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { TrashComponent } from './user/todo/trash/trash.component';
import { TodoinfoComponent } from './user/todo/modals/todoinfo/todoinfo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AuthComponent } from './modules/auth/auth.component';
import { TodoPopupComponent } from './modules/todo/components/todo-popup/todo-popup.component';

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
    NewTodoComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LeftMenuComponent,
    SpinnerComponent,
    TrashComponent,
    TodoinfoComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
