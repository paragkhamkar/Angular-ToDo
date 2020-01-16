import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { Router, ActivatedRoute } from '@angular/router';

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
        "desc": new FormControl(null,Validators.required),
        "dueDate": new FormControl(null,Validators.required),
        "reminderDate": new FormControl(null,Validators.required),
        "category": new FormControl(null,Validators.required),
        "isPublic": new FormControl(null,Validators.required)
      }
    )
  }

  submit(){
    const testA = {
      owner: localStorage.getItem("UserEmail"),
      title: this.todoForm.value.title,
      desc: this.todoForm.value.desc,
      dueDate: this.todoForm.value.dueDate,
      reminderDate: this.todoForm.value.reminderDate,
      category: this.todoForm.value.category,
      isPublic: this.todoForm.value.isPublic
    };
    console.log(testA);
    // this.todoService.addTodo(testA);
  }

}
