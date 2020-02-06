import { Component, OnInit } from '@angular/core';
import { TodoinfoComponent } from 'src/app/user/todo/modals/todoinfo/todoinfo.component';
import { TodoItem } from 'src/app/shared/data.model';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoFilterService } from '../../services/todo-filter.service';
import { TododataService } from '../../services/tododata.service';
import { TodoPopupComponent } from '../todo-popup/todo-popup.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  pendingSelectedList: string[] = [];
  doneSelectedList: string[] = [];
  titleString: string[] = [];
  paramSubscription: Subscription;
  getFiltered: Subscription;
  getTodo: Subscription;
  isPublic: boolean;
  todos: TodoItem[];
  owner: string;

  allowDone = false;
  allowDelete = false;
  allSelected = false;
  dataAvailable = false;
  selectedRow = -1;

  today = this.todoService.toDate(new Date());

  constructor(
    private todoService: TododataService,
    private todoFilter: TodoFilterService,
    private route: ActivatedRoute,
    private message: MessagesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.owner = this.todoService.getUserId();
    this.getTodo = this.todoService.getUpdatedTodo.subscribe(value => {
      this.makeShorterTodo(value);
    });
    this.getFiltered = this.todoFilter.getFilteredTodo.subscribe(value => {
      this.makeShorterTodo(value);
    });
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.isPublic = params.type === 'public' ? true : false;
      this.todoService.isPublicPage(this.isPublic);

      this.todoService.prepareData();
    });
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

  private canOnlyDelete() {
    this.message.infoMessage('You can only delete this todo item');
  }

  private editTodo(event) {
    this.todoService.edit(event.target.id);
  }

  private doneTodo(event) {
    this.updateStatus(event.target.id, false);
  }

  private deleteTodo(event) {
    this.updateStatus(event.target.id, true);
  }

  private updateStatus(id, isDelete) {
    if (this.isPublic) {
      this.updatePublicStatus(id, isDelete);
    } else {
      this.updatePrivateStatus(id, isDelete);
    }
  }

  private updatePublicStatus(id, isDelete) {
    this.todoService.publicStatusUpdate(id, isDelete).subscribe(
      res => {
        this.message.deactivateSpinner();
        this.todoService.prepareData();
      },
      err => this.message.errorMessage('Error')
    );
  }

  private updatePrivateStatus(id, isDelete) {
    this.todoService.publicStatusUpdate(id, isDelete).subscribe(
      res => {
        this.message.deactivateSpinner();
        this.todoService.prepareData();
      },
      err => this.message.errorMessage('Error')
    );
  }

  private deleteSelected() {
    this.batchDelete(this.doneSelectedList);
    this.batchDelete(this.pendingSelectedList);
    this.resetSelected();
  }

  batchDelete(checklist) {
    for (const item of checklist) {
      this.updateStatus(item, true);
    }
  }

  private doneSelected() {
    for (const item of this.pendingSelectedList) {
      this.updateStatus(item, false);
    }
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
        if (this.isPublic) {
          if (item.owner == this.owner) {
            this.selectItem(dummy, item.status);
          }
        } else {
          this.selectItem(dummy, item.status);
        }
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
    const dialogRef = this.dialog.open(TodoPopupComponent, {
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

  ngOnDestroy() {
    this.dataAvailable = false;
  }
}
