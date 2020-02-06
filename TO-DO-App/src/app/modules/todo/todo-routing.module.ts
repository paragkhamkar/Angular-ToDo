import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    children: [
      { path: '', redirectTo: 'list/private', pathMatch: 'full' },
      { path: 'list/:type', component: TodoListComponent },
      { path: 'new', component: NewTodoComponent },
      { path: 'edit/:id', component: NewTodoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
