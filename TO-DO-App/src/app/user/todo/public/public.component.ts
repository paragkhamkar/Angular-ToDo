import { Component, OnInit } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TodoItem } from 'src/app/shared/data.model';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  todos:TodoItem[]
  selected = [];
  allSelected = false;
  allowedBatchOperation:boolean = false;

  owner:string = this.todoService.activeUser;

  constructor(private todoService:TodoDataService,
              private userauth:UserAuthService,
              private todoFilter:TodoFilterService,
              private message:MessagesService) {
    todoService.showFilters.next(true);
    todoService.isPublicPage(true);
    todoFilter.isPublicPage(true);
    this.owner = todoService.activeUser;
    todoService.getUpdatedPublicTodo.subscribe(
      (value: TodoItem[]) =>{
      if(value){
        this.makeShorterTodo(value)
        todoFilter.getDataAvailability.next(true);
      }else
        todoFilter.getDataAvailability.next(false);
    })
    todoFilter.getFilteredTodo.subscribe(value => this.makeShorterTodo)
  }

  private makeShorterTodo(todoItems:TodoItem[]){
    for(let todoItem of todoItems){
          if(todoItem.title.length > 50){
            todoItem.title = todoItem.title.slice(0,50);
            todoItem.title += '....'
          }
    }
    this.todos = todoItems;
  }

  selectAll(event){
   if(event.target.checked){
     this.allSelected = true;
     for(let item = 0; item < this.todos.length; item++){
        if(this.todos[item].owner == this.owner)
        this.selected.push(this.todos[item].todoID);
      }
      this.allowedBatchOperation = true;
   }else{
     this.allowedBatchOperation = false;
     this.allSelected = false;
     this.selected = [];
   }
 }

  selectItem(data){
    let found = false;
    for(let item = 0; item < this.selected.length; item++){
      if(this.selected[item] == data.id){
        found = true;
        this.selected.splice(item,1);
      }
    }
    if(!found)
       this.selected.push(data.id);
    
    if(this.selected.length > 0)
      this.allowedBatchOperation = true;
    else
      this.allowedBatchOperation = false;    
 }

  editTodo(event){
     this.todoService.edit(event.target.id)
   }

  doneTodo(event){
    this.todoService.markDone(event.target.id);
    this.allSelected = false;
   }

  deleteTodo(event){
    this.todoService.delete(event.target.id);
    this.allSelected = false;
   }

  deleteSelected(){
    this.todoService.batchDelete(this.selected)
  }

  doneSelected(){
    this.todoService.batchMarkDone(this.selected)
  }

  ngOnInit() {
    this.todoService.prepareData();
  }
}
