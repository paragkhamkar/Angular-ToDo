import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TododataService } from './services/tododata.service';
import { TodoFilterService } from './services/todo-filter.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoPopupComponent } from './components/todo-popup/todo-popup.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    NewTodoComponent,
    HeaderComponent,
    SideMenuComponent,
    TodoPopupComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [TododataService, TodoFilterService],
  entryComponents: [TodoPopupComponent]
})
export class TodoModule {}
