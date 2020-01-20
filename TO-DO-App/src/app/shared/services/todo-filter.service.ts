import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoDataService } from './todo-data.service';

@Injectable({
  providedIn: 'root'
})
export class TodoFilterService {

  // dataAvailable:boolean = false;
  getDataAvailability = new Subject();

  // filteredTodos = [];
  getFilteredTodo = new Subject();

  constructor(private todoService:TodoDataService) {}

  dataNotFound(){
    this.getDataAvailability.next(false);
  }

  // Get All Todos

  getAllItems(){
    let todo = [];
    let test = JSON.parse(localStorage.getItem('todos'));
    if(test == null)
      return [{title:"No Data Found"}]
    for(let todoItem in test){
        todo.push(test[todoItem])
    }
    return todo;
  }

  // Filter Todos ... By Status or Category

  filterSearch(type, value){
    let todoItems = [];
    let todoData = this.getAllItems();
    for(let todoItem of todoData){
      if(todoItem[type] === value)
        todoItems.push(todoItem)
    }
    this.getFilteredTodo.next(todoItems);
  }

  dateFilter(startDate, endDate, type){
    let fromDate = startDate <= endDate ? startDate : endDate;
    let toDate = startDate > endDate ? startDate : endDate;
    let todoItems = [];
    let todoData = this.getAllItems();
    for(let todoItem of todoData){
      if(todoItem[type] >= fromDate && todoItem[type] <= toDate)
        todoItems.push(todoItem)
    }
    this.getFilteredTodo.next(todoItems);
  }
  //sort by Title or category or status

  sortBy(type){
    let todoData = this.getAllItems();
    if(!todoData)
      return this.dataNotFound();

    let todoItems = todoData.sort( (a,b) => this.compare(a,b,type));
    this.getFilteredTodo.next(todoItems);
  }

  private compare(a, b, type){
    const typeA = a[type].toUpperCase();
    const typeB = b[type].toUpperCase();
    return typeA > typeB ? 1 : -1;
  }

}
