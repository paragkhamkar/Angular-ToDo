import { Injectable } from '@angular/core';
import { TodoModule } from '../todo.module';
import { TodoObject, TodoItem } from 'src/app/shared/data.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Injectable()
export class TododataService {
  publicTodoData: TodoObject;
  privateTodoData: TodoObject;
  getUpdatedTodo = new Subject<TodoItem[]>();
  isRecordAvailabe = new Subject<boolean>();
  isPublic = false;
  activeUser = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private message: MessagesService
  ) {}

  getUserId() {
    let user = localStorage.getItem('localId');
    return user;
  }
  getPrivate() {
    return this.http.get(
      'https://angular-todo-2f483.firebaseio.com/users/' +
        this.getUserId() +
        '-todo.json'
    );
  }

  setPrivate(result: TodoObject) {
    this.privateTodoData = result;
    this.prepareData();
  }

  getPublic() {
    return this.http.get(
      'https://angular-todo-2f483.firebaseio.com/publicToDo.json'
    );
  }

  setPublic(result: TodoObject) {
    this.publicTodoData = result;
    this.prepareData();
  }

  prepareData() {
    this.isRecordAvailabe.next(false);
    const todo: TodoItem[] = [];
    const test = this.isPublic ? this.publicTodoData : this.privateTodoData;
    if (test === undefined || test === null) {
      this.isRecordAvailabe.next(false);
      return false;
    }
    for (const todoItem in test) {
      if (test[todoItem].status !== 'deleted') {
        todo.push(test[todoItem]);
      }
    }
    if (todo.length > 0) {
      this.isRecordAvailabe.next(true);
      this.getUpdatedTodo.next(todo);
    }
  }

  isPublicPage(value) {
    this.isPublic = value;
    this.prepareData();
  }

  getItem(id) {
    return this.isPublic ? this.publicTodoData[id] : this.privateTodoData[id];
  }

  edit(id) {
    this.router.navigate(['/todo', 'edit', id]);
  }

  toDate(date: Date) {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    );
  }

  logout() {
    this.activeUser = '';
    this.publicTodoData = null;
    this.privateTodoData = null;
    this.message.successMessage('Logged Out Successfully');
    this.router.navigate(['/auth/login']);
  }

  deleteFromPrivate(id) {
    return this.http.delete(
      'https://angular-todo-2f483.firebaseio.com/users/' +
        this.activeUser +
        '-todo/' +
        id +
        '.json'
    );
  }

  deleteFromPublic(id) {
    return this.http.delete(
      'https://angular-todo-2f483.firebaseio.com/publicToDo/' + id + '.json'
    );
  }

  addPublicTodo(todoItem: TodoItem) {
    this.message.activateSpinner();
    return this.http.put(
      'https://angular-todo-2f483.firebaseio.com/publicToDo/' +
        todoItem.todoID +
        '.json',
      todoItem
    );
  }

  afterPublicAdded(todo: any) {
    if (this.publicTodoData === undefined || this.publicTodoData === null) {
      this.publicTodoData = {
        [todo.todoID]: todo
      };
    } else {
      this.publicTodoData[todo.todoID] = todo;
    }
    this.prepareData();
    this.router.navigate(['/todo/list/public']);
    this.message.deactivateSpinner();
    this.message.successMessage('Todo Item Added Successfully');
  }

  addPrivateTodo(todoItem: any) {
    return this.http.put(
      'https://angular-todo-2f483.firebaseio.com/users/' +
        this.activeUser +
        '-todo/' +
        todoItem.todoID +
        '.json',
      todoItem
    );
  }

  afterPrivateAdded(todo: any) {
    if (this.privateTodoData === undefined || this.privateTodoData === null) {
      this.privateTodoData = {
        [todo.todoID]: todo
      };
    } else {
      this.privateTodoData[todo.todoID] = todo;
    }
    this.prepareData();
    this.router.navigate(['/todo/list/private']);
    this.message.deactivateSpinner();
    this.message.successMessage('Todo Item Added Successfully');
  }

  publicStatusUpdate(id, isDelete) {
    this.message.activateSpinner();
    const updatedValue = isDelete ? 'deleted' : 'done';
    if (this.isPublic) {
      this.publicTodoData[id].status = updatedValue;
      return this.http.put(
        'https://angular-todo-2f483.firebaseio.com/publicToDo/' + id + '.json',
        this.publicTodoData[id]
      );
    }
  }

  privateStatusUpdate(id, isDelete) {
    const updatedValue = isDelete ? 'deleted' : 'done';
    this.privateTodoData[id].status = updatedValue;
    return this.http.put(
      'https://angular-todo-2f483.firebaseio.com/users/' +
        this.activeUser +
        '-todo/' +
        id +
        '.json',
      this.privateTodoData[id]
    );
  }
  failedToUpdate(err) {
    this.message.deactivateSpinner();
    console.log('TODO DATA SERVICE ERROR : ');
    console.log(err);
  }
}
