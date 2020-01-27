import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import { MessagesService } from './messages.service';
import { TodoItem, TodoObject } from '../data.model';
import { TodoFilterService } from './todo-filter.service';

@Injectable({
  providedIn: 'root'
})

export class TodoDataService{

  publicTodoData:TodoObject;
  privateTodoData:TodoObject;

  activeUser = "";

  constructor( private http:HttpClient,
               private router:Router,
               private message:MessagesService) { }

  getUpdatedPrivateTodo = new Subject<TodoItem[]>();
  getUpdatedPublicTodo = new Subject<TodoItem[]>();
  showFilters = new Subject<boolean>();
  isTodo = new Subject<boolean>();
  isPublic = false;

  isPublicPage(value){
    this.isPublic = value;
  }

  edit(id){
    this.router.navigate(['/user',this.activeUser,'todo','edit',id])
  }

  view(id){
    this.router.navigate(['/user',this.activeUser,'todo',id])
  }

  getTodos(){
    this.getPrivate();
    this.getPublic();
  }

  private getPrivate(){
    let test = this.activeUser;
    this.http.get("https://angular-todo-2f483.firebaseio.com/users/"+test+"-todo.json")
    .subscribe(
      (result:TodoObject) => {
        this.privateTodoData = result;
        this.prepareData();
      },this.failedToUpdate)
  }

  private getPublic(){
    this.http.get("https://angular-todo-2f483.firebaseio.com/publicToDo.json")
    .subscribe(
      (result:TodoObject) => {
        this.publicTodoData = result;
      },this.failedToUpdate)
  }

  getItem(id){
    if(this.isPublic)
      return this.publicTodoData[id]
    else
      return this.privateTodoData[id];
  }

  updatePrivacy(todo:TodoItem){
    if(todo.isPublic)
      this.swapPrivateToPublic(todo)
    else
      this.swapPublicToPrivate(todo)
  }

  private swapPrivateToPublic(todo:TodoItem){
    // let test = todo;
    // test.status = 'deleted'
    return this.http.delete("https://angular-todo-2f483.firebaseio.com/users/"+this.activeUser+"-todo/"+todo.todoID+".json")
    .subscribe(
      res => {
        todo.status = 'pending';
        this.privateTodoData[todo.todoID].status = 'deleted';
        this.addTodo(todo);
      },
      err => {
        console.log("Error")
      }
    )
  }

  private swapPublicToPrivate(todo){
    // todo.status = 'deleted'
    return this.http.delete("https://angular-todo-2f483.firebaseio.com/publicToDo/"+todo.todoID+".json")
      .subscribe(
        res => {
          todo.status = 'pending';
          this.publicTodoData[todo.todoID].status = 'deleted';
          this.addTodo(todo)
        },err => console.log("Error")
      )
  }

  setIsToDo(value:boolean){
    this.showFilters.next(value);
  }

  prepareData(){
    let todo:TodoItem[] = [];
    let test = this.isPublic ? this.publicTodoData : this.privateTodoData
    if(test == undefined){
        return this.isTodo.next(false);
    }
    for(let todoItem in test){
      if(test[todoItem].status != 'deleted')
        todo.push(test[todoItem])
    }
    this.isPublic ? this.getUpdatedPublicTodo.next(todo) : this.getUpdatedPrivateTodo.next(todo);
  }

  addTodo(todoItem:TodoItem){
    this.message.activateSpinner();
    if(todoItem.isPublic){
      return this.http.put("https://angular-todo-2f483.firebaseio.com/publicToDo/"+todoItem.todoID+".json",todoItem)
      .subscribe(
        resolve => {
          if(this.publicTodoData === undefined || this.publicTodoData === null){
            this.publicTodoData = {
              [todoItem.todoID] : todoItem
            }
          }else
            this.publicTodoData[todoItem.todoID] = todoItem;
          this.prepareData();
          this.router.navigate(['/user/'+this.activeUser+'/todo/public']);
          this.message.deactivateSpinner();
          this.message.successMessage("Todo Item Added Successfully");
        }, 
        err => {
          this.failedToUpdate(err)
        })
    }
    
    return this.http.put("https://angular-todo-2f483.firebaseio.com/users/"+this.activeUser+"-todo/"+todoItem.todoID+".json",todoItem)
    .subscribe(
        resolve => {          
          if(this.privateTodoData === undefined || this.privateTodoData === null){
          this.privateTodoData = {
            [todoItem.todoID] : todoItem
          }
        }else
          this.privateTodoData[todoItem.todoID] = todoItem;
        this.router.navigate(['/user/'+this.activeUser+'/todo/private']);
        this.message.deactivateSpinner();
        this.message.successMessage("Todo Item Added Successfully");
        }, 
        err => {
          this.failedToUpdate(err);
        })
  }

  private statusUpdate(id, isDelete){
    this.message.activateSpinner();
    let updatedValue = isDelete ? 'deleted' : 'done';
    if(this.isPublic){
      this.publicTodoData[id].status = updatedValue;
      return this.http.put("https://angular-todo-2f483.firebaseio.com/publicToDo/"+id+".json",this.publicTodoData[id])  
      .subscribe(
        res => {
          this.message.deactivateSpinner();
          this.prepareData() 
        }
          ,err => console.log("Error")
      )
    }
    
    this.privateTodoData[id].status = updatedValue
    return this.http.put("https://angular-todo-2f483.firebaseio.com/users/"+this.activeUser+"-todo/"+id+".json",this.privateTodoData[id])
    .subscribe(
      res => {
        this.message.deactivateSpinner();
        this.prepareData();
      }
      ,err => {
              this.failedToUpdate(err),
              console.log("Error")
      }
    );
  }

  markDone(todoId){
    this.statusUpdate(todoId, false)
  }

  delete(todoId){
    this.statusUpdate(todoId, true)
  }

  batchMarkDone(todoList){
    for(let item of todoList){
      this.markDone(item);
    }
  }

  batchDelete(todoList){
    for(let item of todoList){
      this.delete(item);
    }
  }

  failedToUpdate(err){
    this.message.deactivateSpinner();
    console.log("TODO DATA SERVICE ERROR : ");
    console.log(err);
  }
}