import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor() { }

  addToDo(todoItem){
    console.log(todoItem);
  }

}
