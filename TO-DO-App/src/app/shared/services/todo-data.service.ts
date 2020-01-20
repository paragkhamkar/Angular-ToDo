import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class TodoDataService {

  constructor(private http:HttpClient) { }

  todos:{};
  getUpdatedTodo = new Subject()
  test = new Subject<boolean>();
  isTodo = true;

  getTodos(){
    let todo = [];
    let test = JSON.parse(localStorage.getItem('todos'));
    for(let todoItem in test){
        todo.push(test[todoItem])
    }
    return todo;
  }

  setIsToDo(value:boolean){
    this.isTodo = value;
    this.test.next(this.isTodo);
  }

  prepareData(){
    let todo = [];
    let test = JSON.parse(localStorage.getItem('todos'));
    for(let todoItem in test){
        todo.push(test[todoItem])
    }
    this.getUpdatedTodo.next(todo);
  }

  setData(){
    let userData = JSON.parse(localStorage.getItem("UserDetails"));
    let todos = userData.todo;
    localStorage.setItem("todos",JSON.stringify(this.todos))
    console.log(this.todos);
  }

  setLocalToDo(){

  }

  addTodo(todoItem){
    console.log("Inside Add new ToDo Service");
    if(todoItem.isPublic){
      console.log("this todo is Public adding to global space");
      console.log("This Todo should be saved as");
      console.log(todoItem.todoID+":"+todoItem)
      
      return this.http.put("https://angular-todo-2f483.firebaseio.com/publicToDo/"+todoItem.todoID+".json",todoItem)
      .subscribe(
        resolve => {
          console.log("Todo has been added Successfully");
        }, 
        err => {
          console.log("Error During Saving Todo to Public");
          this.failedToUpdate(err)
        })
    }
    console.log("This ToDo is Private")
    console.log("Adding This to"+localStorage.getItem("UserEmail"));
    console.log("With the Help of"+localStorage.getItem("USER_KEY")+" this keyss");
    return this.http.put("https://angular-todo-2f483.firebaseio.com/users/"+localStorage.getItem("USER_KEY")+"/todo/"+todoItem.todoID+".json",todoItem)
    .subscribe(
        resolve => {
          console.log("Todo has been added Successfully");
        }, 
        err => {
          console.log("Error During Saving Todo to Public");
          this.failedToUpdate(err)
        })
  }

  private addPublicTodo(){

  }

  private addPrivateTodo(){

  }
  
  private appendTodo(){

  }



  added(test){
    console.log("Inside added(test)")
    console.log(test)
  }

  failedToUpdate(err){
    console.log("Inside FailedTOUpdate(err)");
    console.log(err);
  }

  validateTodoItem(){

  }

  getUserDetails(){
    
  }
}