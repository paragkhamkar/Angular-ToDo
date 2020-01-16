import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor() { }

  test = new Subject<boolean>();
  isTodo = true;

  setIsToDo(value:boolean){
    this.isTodo = value;
    this.test.next(this.isTodo);
  }


  addTodo(todoItem){
    this.validateTodoItem()
  }

  validateTodoItem(){

  }

}