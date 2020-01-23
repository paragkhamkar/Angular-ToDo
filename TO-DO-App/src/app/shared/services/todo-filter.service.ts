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
  todo:any = [];
  isPublic = false;

  constructor(private todoService:TodoDataService) {
    todoService.getUpdatedPrivateTodo.subscribe( value => {
      if(!this.isPublic)
        this.todo = value;
    });

    todoService.getUpdatedPublicTodo.subscribe( value => {
      if(this.isPublic)
        this.todo = value;
    })
  }

  isPublicPage(value){
    this.isPublic = value;
  }
  
  showAll(){
    this.getFilteredTodo.next(this.todo);
  }

  filterSearch(type, value){
    let todoItems = [];
    if(this.todo){
    for(let todoItem of this.todo){
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
    if(this.todo){
    for(let todoItem of this.todo){
      if(todoItem[type] >= fromDate && todoItem[type] <= toDate)
        todoItems.push(todoItem)
    }
    this.getFilteredTodo.next(todoItems);
  }
}

  sortBy(type){
    let todoData:any = this.todo;
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
