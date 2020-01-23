import { Component, OnInit } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  todos:{}

  constructor(private todoService:TodoDataService,
              private userauth:UserAuthService,
              private todoFilter:TodoFilterService,
              private message:MessagesService) {
    todoService.setIsToDo(true);
    todoService.isPublicPage(false);
    todoFilter.isPublicPage(false);
    todoService.getUpdatedPrivateTodo.subscribe(value =>{
      this.todos = value;
    })
    todoFilter.getFilteredTodo.subscribe(value => this.todos = value)
   }

   editTodo(event){
     this.todoService.edit(event.target.id)
   }

   doneTodo(event){
    this.todoService.markDone(event.target.id)
   }

   deleteTodo(event){
     console.log("deleting")
    this.todoService.delete(event.target.id)
   }
  ngOnInit() {
    this.message.infoMessage("Fetching Todo Items")
    setTimeout(
      ()=>this.todoService.prepareData(),2000)
    
  }

}
