import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit, OnDestroy{

  todoForm:FormGroup;
  todoId:string = '';
  todoItem;
  editMode:boolean = false;
  test:boolean;

  constructor(
              private todoService:TodoDataService,
              private router:Router,
              private route:ActivatedRoute) {
      this.editMode = false;
      this.todoService.setIsToDo(false);
      route.params.subscribe(
        (params:Params)=> {
            this.todoId = params['id'];
        }
      )
   }

  setForm(){
    this.todoForm.setValue(
      {
        title : this.todoItem.title,
        desc : this.todoItem.desc,
        dueDate : this.todoItem.dueDate,
        reminderDate : this.todoItem.reminderDate,
        category : this.todoItem.category,
        isPublic : this.todoItem.isPublic
      });
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
    if(this.todoId){
      this.editMode = true;
      this.todoItem = this.todoService.getItem(this.todoId);
      this.setForm();
    }
  }

  toDate(date:Date){
    return date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDate()
  }

  submit(){
    let todo = {
      owner: this.todoService.activeUser,
      title: this.todoForm.value.title,
      desc: this.todoForm.value.desc,
      dueDate: this.todoForm.value.dueDate,
      reminderDate: this.todoForm.value.reminderDate,
      category: this.todoForm.value.category == null? 'Home':this.todoForm.value.category,
      isPublic: this.todoForm.value.isPublic == "Yes" ? true : false,
      status: "pending",
      todoID: Math.random().toString(36).substr(2, 10)
    };

    if(this.editMode){
      if(this.todoItem.isPublic === todo.isPublic){
        todo.todoID = this.todoItem.todoID
        this.todoService.addTodo(todo);    
      }else{
        todo.todoID = this.todoItem.todoID
        this.todoService.updatePrivacy(todo)
      }
    }else
       this.todoService.addTodo(todo);
  }

  ngOnDestroy(){
    this.editMode = false;
    this.todoForm.reset();
  }
  
}
