import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  todoForm:FormGroup;

  test:boolean;

  constructor(
              private todoService:TodoDataService,
              private router:Router) {
      this.todoService.setIsToDo(false);
   }

  ngOnInit() {
    this.todoForm = new FormGroup(
      {
        "title": new FormControl(null,Validators.required),
        "desc": new FormControl(null),
        "dueDate": new FormControl(this.toDate(new Date),Validators.required),
        "reminderDate": new FormControl(this.toDate(new Date)),
        "category": new FormControl("Home"),
        "isPublic": new FormControl("No")
      }
    )
    console.log("Controls Set");
  }

  toDate(date:Date){
    return date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDate()
  }

  submit(){
    let test = JSON.parse(localStorage.getItem("UserDetails"))
    const todoItem = {
      owner: test.email,
      title: this.todoForm.value.title,
      desc: this.todoForm.value.desc,
      dueDate: this.todoForm.value.dueDate,
      reminderDate: this.todoForm.value.reminderDate,
      category: this.todoForm.value.category == null? 'Home':this.todoForm.value.category,
      isPublic: this.todoForm.value.isPublic == "Yes" ? true : false,
      status: "pending",
      todoID: Math.random().toString(36).substr(2, 10)
    };
    this.todoService.addTodo(todoItem);
  }

}
