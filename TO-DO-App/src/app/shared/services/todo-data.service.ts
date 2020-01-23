import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TodoFilterService } from './todo-filter.service';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})

export class TodoDataService{

  constructor( private http:HttpClient,
               private router:Router,
               private message:MessagesService) { }

  todos:{};
  getUpdatedPrivateTodo = new Subject();
  getUpdatedPublicTodo = new Subject();
  showFilters = new Subject<boolean>();
  isTodo = new Subject<boolean>();
  isPublic = false;

  isPublicPage(value){
    this.isPublic = value;
  }

  edit(id){
    this.router.navigate(['/user',localStorage.getItem('localId'),'todo','edit',id])
  }

  getTodos(){
    this.getPrivate();
    this.getPublic();
  }

  private getPrivate(){
    this.http.get("https://angular-todo-2f483.firebaseio.com/users/"+localStorage.getItem('localId')+"-todo.json")
    .subscribe(
      (result:any) => {
        localStorage.setItem("userTodos", JSON.stringify(result));
      },this.failedToUpdate)
  }

  private getPublic(){
    this.http.get("https://angular-todo-2f483.firebaseio.com/publicToDo.json")
    .subscribe(
      (result:any) => {
        localStorage.setItem("publicTodos", JSON.stringify(result));
      },this.failedToUpdate)
  }

  setIsToDo(value:boolean){
    this.showFilters.next(value);
  }

  prepareData(){
    let todo = [];
    let storageName = this.isPublic ? 'publicTodos' : 'userTodos';
    let test:any = JSON.parse(localStorage.getItem(storageName));
    if(test == ""){
        return this.isTodo.next(false)
    }
    for(let todoItem in test){
      if(test[todoItem].status != 'deleted')
        todo.push(test[todoItem])
    }
    this.isPublic ? this.getUpdatedPublicTodo.next(todo) : this.getUpdatedPrivateTodo.next(todo);
  }

  setData(){
    let userData = JSON.parse(localStorage.getItem("UserDetails"));
    let todos = userData.todo;
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  addTodo(todoItem){
    this.message.activateSpinner();
    if(todoItem.isPublic){
      return this.http.put("https://angular-todo-2f483.firebaseio.com/publicToDo/"+todoItem.todoID+".json",todoItem)
      .subscribe(
        resolve => {
          let oldPublicTodo = JSON.parse(localStorage.getItem('publicTodos'))||{};
          oldPublicTodo[todoItem.todoID] = todoItem;
          localStorage.setItem('publicTodos', JSON.stringify(oldPublicTodo));
          this.prepareData();
          this.router.navigate(['/user/'+localStorage.getItem('localId')+'/todo/public']);
          this.message.deactivateSpinner();
          this.message.successMessage("Todo Item Added Successfully");
        }, 
        err => {
          this.failedToUpdate(err)
        })
    }
    
    return this.http.put("https://angular-todo-2f483.firebaseio.com/users/"+localStorage.getItem('localId')+"-todo/"+todoItem.todoID+".json",todoItem)
    .subscribe(
        resolve => {
          let oldTodo = JSON.parse(localStorage.getItem('userTodos'))||{};
          oldTodo[todoItem.todoID] = todoItem;
          localStorage.setItem('userTodos', JSON.stringify(oldTodo));
          this.router.navigate(['/user/'+localStorage.getItem('localId')+'/todo/private']);
          this.message.deactivateSpinner();
          this.message.successMessage("Todo Item Added Successfully");
        }, 
        err => {
          this.failedToUpdate(err);
        })
  }

  markDone(todoId){
    if(this.isPublic){
      return this.http.put("https://angular-todo-2f483.firebaseio.com/publicToDo/"+todoId+"/status.json","done");  
    }
    return this.http.put("https://angular-todo-2f483.firebaseio.com/users/"+localStorage.getItem('localId')+"-todo/"+todoId+"/status.json","done");
  }

  batchMarkDone(){

  }

  delete(todoId){
    if(this.isPublic){
      let todos = JSON.parse(localStorage.getItem('publicTodos'));
      todos[todoId].status = 'deleted'
      return this.http.put("https://angular-todo-2f483.firebaseio.com/publicToDo/"+todoId+".json",todos[todoId])
      .subscribe(
        res => {console.log("deleted")},err => console.log("Error")
      )
    }

    let todos = JSON.parse(localStorage.getItem('userTodos'));
    todos[todoId].status = 'deleted'
    return this.http.put("https://angular-todo-2f483.firebaseio.com/users/"+localStorage.getItem('localId')+"-todo/"+todoId+".json",todos[todoId])
    .subscribe(
      res => {console.log("deleted")},err => {console.log("Error"); console.log(err)}
    )
  }

  batchDelete(){

  }

  failedToUpdate(err){
    this.message.deactivateSpinner();
    console.log("TODO DATA SERVICE ERROR : ")
    console.log(err);
  }
}