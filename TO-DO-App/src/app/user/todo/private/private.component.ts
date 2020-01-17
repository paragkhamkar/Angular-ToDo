import { Component, OnInit } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  todos:{}

  constructor(private todoService:TodoDataService,
              private userauth:UserAuthService) {
    this.todoService.setIsToDo(true);
    this.todoService.getUpdatedTodo.subscribe(value =>{
      console.log("Sub")
      console.log(value)
      this.todos = value;
    } )
   }

   editTodo(event){
     console.log("Edit : "+ event.target.id)
      console.log()
   }

  ngOnInit() {
    this.todoService.prepareData();
  }

}
