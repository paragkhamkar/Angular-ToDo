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
  showMenu:boolean;
  
  constructor(private todoService:TodoDataService,
              private filterService:TodoFilterService) {
    this.todoService.showFilters.subscribe(value => this.showMenu = value);
    filterService.getDataAvailability.subscribe(value  => this.dataAvaliable = value)
    this.todoService.showFilters.next(true);
   }

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
