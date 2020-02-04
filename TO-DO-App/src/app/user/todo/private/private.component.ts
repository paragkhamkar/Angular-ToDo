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
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit, OnDestroy {
  todos: TodoItem[];
  allSelected = false;
  dataAvailable = false;
  selectedRow = -1;
  selected = [];
  titleString = [];
  getTodo: Subscription;
  getFiltered: Subscription;
  pendingSelectedList = [];
  doneSelectedList = [];
  allowDone = false;
  allowDelete = false;
  today = this.toDate(new Date());

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
      this.makeShorterTodo(value);
    });
    this.getFiltered = todoFilter.getFilteredTodo.subscribe(value => {
      this.makeShorterTodo(value);
    });
  }

  ngOnInit() {
    this.todoService.prepareData();
  }

  private makeShorterTodo(todoItems: TodoItem[]) {
    this.titleString = [];
    for (const todoItem of todoItems) {
      this.titleString.push(todoItem.title);
      if (todoItem.title.length > 20) {
        this.titleString[this.titleString.length - 1] = todoItem.title.slice(
          0,
          20
        );
        this.titleString[this.titleString.length - 1] += '....';
      }
    }
    this.todos = todoItems;
  }

  // private navigate(id) {
  //   this.todoService.view(id);
  // }

  private editTodo(event) {
    this.todoService.edit(event.target.id);
  }

  private doneTodo(event) {
    this.todoService.markDone(event.target.id);
  }

  private deleteTodo(event) {
    this.todoService.delete(event.target.id);
  }

  private deleteSelected() {
    this.todoService.batchDelete(this.doneSelectedList);
    this.todoService.batchDelete(this.pendingSelectedList);
    this.resetSelected();
  }

  private doneSelected() {
    this.todoService.batchMarkDone(this.pendingSelectedList);
    this.resetSelected();
  }

  private selectItem(event, status) {
    if (status === 'pending') {
      this.addPendingToList(event.target.id);
    } else {
      this.addDoneToList(event.target.id);
    }
    this.setBatchOptions();
  }

  private addPendingToList(id) {
    let found = false;
    for (let item = 0; item < this.pendingSelectedList.length; item++) {
      if (this.pendingSelectedList[item] === id) {
        this.pendingSelectedList.splice(item, 1);
        found = true;
        break;
      }
    }
    if (!found) {
      this.pendingSelectedList.push(id);
    }
  }

  private addDoneToList(id) {
    let found = false;
    for (let item = 0; item < this.doneSelectedList.length; item++) {
      if (this.doneSelectedList[item] === id) {
        this.doneSelectedList.splice(item, 1);
        found = true;
        break;
      }
    }
    if (!found) {
      this.doneSelectedList.push(id);
    }
  }

  private selectAll(event) {
    this.resetSelected();
    if (event.target.checked) {
      this.allSelected = true;
      for (const item of this.todos) {
        const dummy = {
          target: {
            id: item.todoID
          }
        };
        this.selectItem(dummy, item.status);
      }
    }
    this.setBatchOptions();
  }

  private setBatchOptions() {
    if (this.pendingSelectedList.length <= 0) {
      this.allowDone = false;
    }
    if (this.pendingSelectedList.length > 0) {
      this.allowDone = true;
      this.allowDelete = true;
    }
    if (
      this.pendingSelectedList.length > 0 ||
      this.doneSelectedList.length > 0
    ) {
      this.allowDelete = true;
    }
    if (
      this.doneSelectedList.length <= 0 &&
      this.pendingSelectedList.length <= 0
    ) {
      this.allowDelete = false;
    }
  }

  private resetSelected() {
    this.allSelected = false;
    this.pendingSelectedList = [];
    this.doneSelectedList = [];
    this.setBatchOptions();
  }

  private showTodo(event, index): void {
    const dialogRef = this.dialog.open(TodoinfoComponent, {
      width: '600px',
      data: this.todoService.getItem(event.target.id),
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedRow = index;
      setTimeout(() => {
        this.selectedRow = -1;
      }, 1500);
    });
  }

  private toDate(date: Date) {
    let dayOfMonth = '';
    if (Number(date.getDate()) < 10) {
      dayOfMonth = '0' + date.getDate();
    } else {
      dayOfMonth = '' + date.getDate();
    }
    console.log(dayOfMonth);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + dayOfMonth;
  }

  ngOnDestroy() {
    this.dataAvailable = false;
    this.getTodo.unsubscribe();
    this.getFiltered.unsubscribe();
  }
}
