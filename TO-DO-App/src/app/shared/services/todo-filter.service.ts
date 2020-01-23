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
    if(this.todo){
      this.getFilteredTodo.next(this.todo);
      this.getDataAvailability.next(true);
    }
    else
      this.getDataAvailability.next(false);
  }

  filterSearch(type, value){
    let todoItems = [];
    if(this.todo){
    for(let todoItem of this.todo){
      if(todoItem[type] === value)
        todoItems.push(todoItem)
    }
    if(todoItems.length > 0){
      this.getFilteredTodo.next(todoItems);
      this.getDataAvailability.next(true);
    }
    else
      this.getDataAvailability.next(false);
  }    
}

textSearch(text){
  let searchKey = text.toLowerCase();
  let todoItems = [];
    if(this.todo){
    for(let todoItem of this.todo){
      let title:string = todoItem.title;
      let desc:string = todoItem.desc;
      if(title.toLowerCase().search(searchKey) > -1 || desc.toLowerCase().search(searchKey) > -1)
        todoItems.push(todoItem)
    }
    if(todoItems.length > 0){
      this.getFilteredTodo.next(todoItems);
      this.getDataAvailability.next(true);
    }
    else
      this.getDataAvailability.next(false);
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
    if(todoItems.length > 0){
      this.getFilteredTodo.next(todoItems);
      this.getDataAvailability.next(true);
    }
    else
      this.getDataAvailability.next(false);
  }
}

  // sortBy(type){
  //   let todoData:any = this.todo;
  //   if(!todoData)
  //     return this.getDataAvailability.next(false);
      
  //   let todoItems = todoData.sort( (a,b) => this.compare(a,b,type));
  //   this.getFilteredTodo.next(todoItems);
  // }

  // private compare(a:string|number, b:string|number, filterBy:string){
  //   const typeA = a[filterBy].toUpperCase();
  //   const typeB = b[filterBy].toUpperCase();
  //   if(typeA == typeB){
  //     return 0;
  //   }
  //   return typeA > typeB ? 1 : -1;
  // }

}
