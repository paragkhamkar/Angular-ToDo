import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {

  todoForm:FormGroup;

  title = '';
  description = '';
  dueDate = '';
  reminderDate = '';
  category = '';

  constructor(private todoService:TodoDataService) { }

  ngOnInit() {
    this.todoForm = new FormGroup(
      {
        "title": new FormControl(null,Validators.required),
        "desc": new FormControl(null,Validators.required),
        "dueDate": new FormControl(null,Validators.required),
        "reminderDate": new FormControl(null,Validators.required),
        "category": new FormControl(null,Validators.required)
      }
    )
  }

  submit(){
    const testA = {
      duedate: this.todoForm.value.dueDate,
      title: this.todoForm.value.title,
      reminderDate : this.todoForm.value.reminderDate
    };
    
    //  title:"This is the test run", reminderDate:"2020-15-01"

    this.todoService.addToDo(testA);
  }

}
