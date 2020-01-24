import { Component, OnInit } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit{

  dataAvaliable:boolean = true;
  
  constructor(private todoService:TodoDataService,
              private filterService:TodoFilterService) {
    this.todoService.setIsToDo(true);
    this.todoService.showFilters.subscribe(value => this.test = value);
    filterService.getDataAvailability.subscribe(value  => this.dataAvaliable = value)
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
