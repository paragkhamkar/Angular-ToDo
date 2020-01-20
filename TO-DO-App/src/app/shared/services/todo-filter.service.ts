import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoDataService } from './todo-data.service';

@Injectable({
  providedIn: 'root'
})
export class TodoFilterService {
  
  getDataAvailability = new Subject();
  getFilteredTodo = new Subject();
  getFilteredPublic = new Subject();

  constructor(private todoService:TodoDataService) {
    this.getFilteredTodo.next(this.getAllItems())
  }
  
  private getAllItems(){
    let todo = [];
    let test = JSON.parse(localStorage.getItem('todos'));
    if(test == null)
        return this.getDataAvailability.next(false)
    for(let todoItem in test){
        todo.push(test[todoItem])
    }
    this.getDataAvailability.next(true)
    return todo;
  }

  fetchUpdatedTodo(){
    if(localStorage.getItem('todos'))
      this.getFilteredTodo.next(JSON.parse(localStorage.getItem('todos')));
    else
      this.getDataAvailability.next(false)
  }
  getAll(){
    this.getFilteredTodo.next(this.getAllItems());
  }

  filterSearch(type, value){
    let todoItems = [];
    let todoData = this.getAllItems();
    if(todoData){
    for(let todoItem of todoData){
      if(todoItem[type] === value)
        todoItems.push(todoItem)
    }
    this.getFilteredTodo.next(todoItems);
  }    
}

  dateFilter(startDate, endDate, type){
    let fromDate = startDate <= endDate ? startDate : endDate;
    let toDate = startDate > endDate ? startDate : endDate;
    let todoItems = [];
    let todoData = this.getAllItems();
    if(todoData){
    for(let todoItem of todoData){
      if(todoItem[type] >= fromDate && todoItem[type] <= toDate)
        todoItems.push(todoItem)
    }
    this.getFilteredTodo.next(todoItems);
  }
}

  sortBy(type){
    let todoData = this.getAllItems();
    if(!todoData)
      return this.getDataAvailability.next(false);
      
    let todoItems = todoData.sort( (a,b) => this.compare(a,b,type));
    this.getFilteredTodo.next(todoItems);
  }

  private compare(a:string|number, b:string|number, filterBy:string){
    const typeA = a[filterBy].toUpperCase();
    const typeB = b[filterBy].toUpperCase();
    if(typeA == typeB){
      return 0;
    }
    return typeA > typeB ? 1 : -1;
  }

}
