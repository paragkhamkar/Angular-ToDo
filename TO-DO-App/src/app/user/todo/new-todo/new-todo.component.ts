import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoItem } from 'src/app/shared/data.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Subscription } from 'rxjs';
import { TodoComponent } from '../todo.component';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit, OnDestroy {
  todoForm: FormGroup;
  todoId = '';
  viewId = '';
  editMode = false;
  viewMode = false;
  editable = true;
  todoItem: TodoItem;
  paramSubscription: Subscription;

  constructor(
    private message: MessagesService,
    private todoService: TodoDataService,
    private filterService: TodoFilterService,
    private router: Router,
    private route: ActivatedRoute,
    private todoComponent: TodoComponent
  ) {
    todoComponent.showMenu = false;
    filterService.getDataAvailability.next(true);
    todoService.showFilters.next(false);
    this.editMode = false;
    this.viewMode = false;
    this.paramSubscription = route.params.subscribe((params: Params) => {
      this.viewId = params.view;
      this.todoId = params.id;
    });
  }

  goBack() {
    this.router.navigate([
      '/user',
      localStorage.getItem('localId'),
      'todo',
      'private'
    ]);
  }

  setForm() {
    this.todoForm.setValue({
      title: this.todoItem.title,
      desc: this.todoItem.desc || '',
      dueDate: this.todoItem.dueDate,
      reminderDate: this.todoItem.reminderDate,
      category: this.todoItem.category,
      isPublic: this.todoItem.isPublic
    });
  }

  ngOnInit() {
    this.todoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      desc: new FormControl(null),
      dueDate: new FormControl(this.toDate(new Date()), Validators.required),
      reminderDate: new FormControl(this.toDate(new Date())),
      category: new FormControl('Home'),
      isPublic: new FormControl('No')
    });

    if (this.todoId || this.viewId) {
      this.editMode = true;
      this.todoItem = this.todoService.getItem(this.todoId || this.viewId);
      this.editable = this.todoItem.status === 'done' ? false : true;
      this.setForm();
    }
  }

  toDate(date: Date) {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    );
  }

  submit() {
    const todo = {
      owner: this.todoService.activeUser,
      title: this.todoForm.value.title,
      desc: this.todoForm.value.desc || 'No Description',
      dueDate: this.toDate(new Date(this.todoForm.value.dueDate)),
      reminderDate: this.toDate(new Date(this.todoForm.value.reminderDate)),
      category:
        this.todoForm.value.category == null
          ? 'Home'
          : this.todoForm.value.category,
      isPublic: this.todoForm.value.isPublic === 'Yes' ? true : false,
      status: 'pending',
      todoID: Math.random()
        .toString(36)
        .substr(2, 10)
    };

    const today = this.toDate(new Date());
    const reminder = this.toDate(new Date(this.todoForm.value.reminderDate));
    const due = this.toDate(new Date(this.todoForm.value.dueDate));

    if (due < today || due < reminder || reminder < today) {
      this.message.errorMessage('Please Enter Valid Dates');
      return false;
    }

    if (this.editMode) {
      if (this.todoItem.isPublic === todo.isPublic) {
        todo.todoID = this.todoItem.todoID;
        this.todoService.addTodo(todo);
      } else {
        todo.todoID = this.todoItem.todoID;
        this.todoService.updatePrivacy(todo);
      }
    } else {
      this.todoService.addTodo(todo);
    }
  }

  ngOnDestroy() {
    this.editMode = false;
    this.todoForm.reset();
    this.paramSubscription.unsubscribe();
  }
}
