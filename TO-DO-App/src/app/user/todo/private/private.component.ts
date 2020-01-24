import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit, OnDestroy{
  todos:any;
  allowedBatchOperation = false;
  allSelected = false;
  dataAvailable:boolean = false;
  selected = [];

  constructor(private todoService:TodoDataService,
              private userauth:UserAuthService,
              private todoFilter:TodoFilterService,
              private message:MessagesService) {
    todoService.setIsToDo(true);
    todoService.isPublicPage(false);
    todoFilter.isPublicPage(false);
    todoService.getUpdatedPrivateTodo.subscribe(value => this.todos = value);
    todoFilter.getFilteredTodo.subscribe(value => this.todos = value);
   }

   selectAll(event){
    if(event.target.checked){
      this.allSelected = true;
      this.allowedBatchOperation = true;
      for(let item = 0; item < this.todos.length; item++){
         this.selected.push(this.todos[item].todoID);
       }
    }else{
      this.allSelected = false;
      this.allowedBatchOperation = false;
      this.selected = [];
    }
  }
 
   selectItem(data){
     let found = false;
 
     for(let item = 0; item < this.selected.length; item++){
       if(this.selected[item] == data.target.id){
         found = true;
         this.selected.splice(item,1);
       }
     }
     if(!found)
        this.selected.push(data.target.id);
     
     if(this.selected.length > 0)
        this.allowedBatchOperation = true;
     else
       this.allowedBatchOperation = false;    
  }

   editTodo(event){
     this.todoService.edit(event.target.id)
   }

   doneTodo(event){
    this.todoService.markDone(event.target.id)
   }

   deleteTodo(event){
    this.todoService.delete(event.target.id)
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

  ngOnDestroy(){
    this.selected = [];
    this.dataAvailable = false;
    this.allowedBatchOperation = false;
  }
  
}
