import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TodoItem } from 'src/app/shared/data.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodoinfoComponent } from '../modals/todoinfo/todoinfo.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit, OnDestroy {
  todos: TodoItem[];
  allowedBatchOperation = false;
  allSelected = false;
  dataAvailable = false;
  selected = [];
  getTodo: Subscription;
  getFiltered: Subscription;
  infoId = "";

  constructor(
    private todoService: TodoDataService,
    private userauth: UserAuthService,
    private todoFilter: TodoFilterService,
    private message: MessagesService,
    public dialog: MatDialog
  ) {
    todoService.showFilters.next(true);
    todoService.isPublicPage(false);
    todoFilter.isPublicPage(false);
    this.getTodo = todoService.getUpdatedPrivateTodo.subscribe(value => {
      this.makeShorterTodo(value)
    });
    this.getFiltered = todoFilter.getFilteredTodo.subscribe(value => {
      this.makeShorterTodo
    });
  }

  navigate(id) {
    this.todoService.view(id);
  }

  showTodo(event, index): void {
    console.log("Info : ",index)
    console.log(event.target.parentElement)
    const dialogRef = this.dialog.open(TodoinfoComponent, {
      width: '600px',
      data : this.todoService.getItem(event.target.id)
    });

    dialogRef.afterClosed().subscribe(result => {
      let selectedRow = document.getElementById(index);
      selectedRow.style.backgroundColor = 'yellow'
      setTimeout(() => {
        selectedRow.style.backgroundColor = 'white'
      }, 500);
    });
  }

  private makeShorterTodo(todoItems: TodoItem[]) {
    for (const todoItem of todoItems) {
      if (todoItem.title.length > 30) {
        todoItem.title = todoItem.title.slice(0, 30);
        todoItem.title += '....';
      }
    }
    this.todos = todoItems;
  }

  selectAll(event) {
    if (event.target.checked) {
      this.allSelected = true;
      this.allowedBatchOperation = true;
      for (const item of this.todos) {
        this.selected.push(item.todoID);
      }
    } else {
      this.allSelected = false;
      this.allowedBatchOperation = false;
      this.selected = [];
    }
  }

  selectItem(data) {
    let found = false;

    for (let item = 0; item < this.selected.length; item++) {
      if (this.selected[item] === data.target.id) {
        found = true;
        this.selected.splice(item, 1);
      }
    }
    if (!found) {
      this.selected.push(data.target.id);
    }

    if (this.selected.length > 0) {
      this.allowedBatchOperation = true;
    } else {
      this.allowedBatchOperation = false;
    }
  }

  editTodo(event) {
    this.todoService.edit(event.target.id);
  }

  doneTodo(event) {
    this.todoService.markDone(event.target.id);
  }

  deleteTodo(event) {
    this.todoService.delete(event.target.id);
  }

  deleteSelected() {
    this.todoService.batchDelete(this.selected);
  }

  doneSelected() {
    this.todoService.batchMarkDone(this.selected);
  }

  ngOnInit() {
    this.todoService.prepareData();
  }

  ngOnDestroy() {
    this.selected = [];
    this.dataAvailable = false;
    this.allowedBatchOperation = false;
    this.getTodo.unsubscribe();
    this.getFiltered.unsubscribe();
  }
}
