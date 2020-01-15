import { NgModule } from '@angular/core';
import { Routes, RouterModule } from'@angular/router'
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
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    { path: '', component: UserComponent, pathMatch: 'full'},
    { 
      path: 'auth', component: UserAuthComponent,
      children: [
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignupComponent }
      ]
    },
    { 
      path: 'user', component: UserComponent,
      children:[
        { path: 'profile', component: SignupComponent },
        { path: 'todo', component: TodoComponent ,
          children: [
            { path: 'public', component: PublicComponent },
            { path: 'private', component: PrivateComponent },
            { path: 'new-todo', component: NewTodoComponent },
            { path: 'edit/:id', component: NewTodoComponent }
          ]
        },
      ]
    },
    { path: '**', component: PageNotFoundComponent }
  ];

  @NgModule({
      declarations:[],
      imports:[
          CommonModule,
          RouterModule.forRoot(appRoutes)
      ],
      exports:[RouterModule]
  })

export class AppRoutingModule{ }