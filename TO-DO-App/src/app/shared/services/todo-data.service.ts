import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TodoFilterService } from './todo-filter.service';

@Injectable({
  providedIn: 'root'
})

export class TodoDataService{

  constructor( private http:HttpClient,
               private router:Router) { }

  todos:{};
  getUpdatedTodo = new Subject()
  showFilters = new Subject<boolean>();
  isTodo = true;

  edit(id){
    this.router.navigate(['/user',localStorage.getItem('localId'),'todo','edit',id])
  }

  getTodos(){
    let todo = [];
    let test = JSON.parse(localStorage.getItem('todos'));
    for(let todoItem in test){
        todo.push(test[todoItem])
    }
    return todo;
  }

  setIsToDo(value:boolean){
    this.showFilters.next(value);
  }

  prepareData(){
    let todo = [];
    let test = JSON.parse(localStorage.getItem('todos')) || [];
    for(let todoItem in test){
        todo.push(test[todoItem])
    }
    this.getUpdatedTodo.next(todo);
  }

  setData(){
    let userData = JSON.parse(localStorage.getItem("UserDetails"));
    let todos = userData.todo;
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  setLocalToDo(){

  }

  addTodo(todoItem){
    if(todoItem.isPublic){
      return this.http.put("https://angular-todo-2f483.firebaseio.com/publicToDo/"+todoItem.todoID+".json",todoItem)
      .subscribe(
        resolve => {
          let oldPublicTodo = JSON.parse(localStorage.getItem('publicTodo'))||{};
          oldPublicTodo.todoItem.todoID = todoItem;
          localStorage.setItem('publicTodo', JSON.stringify(oldPublicTodo));
          this.router.navigate(['/user/'+localStorage.getItem('localId')+'/todo/private'])
        }, 
        err => {
          this.failedToUpdate(err)
        })
    }
    
    return this.http.put("https://angular-todo-2f483.firebaseio.com/users/"+localStorage.getItem("localId")+"/todo/"+todoItem.todoID+".json",todoItem)
    .subscribe(
        resolve => {
          let oldTodo = JSON.parse(localStorage.getItem('todos'))||{};
          oldTodo.todoItem.todoID = todoItem;
          localStorage.setItem('todos', JSON.stringify(oldTodo));
        }, 
        err => {
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