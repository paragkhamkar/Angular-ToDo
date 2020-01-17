import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http:HttpClient) { }

  test = new Subject<boolean>();
  isTodo = true;

  setIsToDo(value:boolean){
    this.isTodo = value;
    this.test.next(this.isTodo);
  }

  testC = 0;
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