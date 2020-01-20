import { Component, OnInit } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  todos:{}

  constructor(private todoService:TodoDataService,
              private userauth:UserAuthService,
              private todoFilter:TodoFilterService) {
    this.todoService.setIsToDo(true);
    this.todoService.getUpdatedTodo.subscribe(value =>{
      this.todos = value;
    })
    todoFilter.getFilteredTodo.subscribe(value => this.todos = value)

   }

   editTodo(event){
     this.todoService.edit(event.target.id)
   }

  ngOnInit() {
    setTimeout(
      ()=>this.todoService.prepareData(),500)
    
  }

}
