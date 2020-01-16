import { Component, OnInit } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

  constructor(private todoService:TodoDataService) {
    this.todoService.setIsToDo(true);
    this.todoService.test.subscribe(value => this.test = value)
    console.log(this.test);
   }

  test:boolean;

  ngOnInit() {

  }
  
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
