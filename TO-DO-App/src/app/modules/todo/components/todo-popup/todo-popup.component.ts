import { Component, OnInit, Inject } from '@angular/core';
import { TodoItem } from 'src/app/shared/data.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TododataService } from '../../services/tododata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-popup',
  templateUrl: './todo-popup.component.html',
  styleUrls: ['./todo-popup.component.css']
})
export class TodoPopupComponent implements OnInit {
  todo: TodoItem;
  publicStatusUpdate: Subscription;
  privateStatusUpdate: Subscription;

  constructor(
    private todoService: TododataService,
    private message: MessagesService,
    public dialogRef: MatDialogRef<TodoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.todo = data;
  }

  ngOnInit() {}

  editTodo(id) {
    this.todoService.edit(id);
    this.closeModal();
  }

  doneTodo(id) {
    if (this.todo.isPublic) {
      this.updatePublicStatus(id, false);
    } else {
      this.updatePrivateStatus(id, false);
    }
    this.message.successMessage('Marked As Done');
  }

  deleteTodo(id) {
    if (this.todo.isPublic) {
      this.updatePublicStatus(id, true);
    } else {
      this.updatePrivateStatus(id, true);
    }
    this.closeModal();
  }

  updatePrivateStatus(id, isDelete) {
    this.privateStatusUpdate = this.todoService
      .privateStatusUpdate(id, isDelete)
      .subscribe(value => {
        this.todoService.prepareData();
        if (isDelete) {
          this.message.successMessage('Deleted Successfully');
        } else {
          this.message.successMessage('Marked As Done Successfully');
        }
      });
  }
  updatePublicStatus(id, isDelete) {
    this.publicStatusUpdate = this.todoService
      .publicStatusUpdate(id, isDelete)
      .subscribe(value => {
        this.todoService.prepareData();
        if (isDelete) {
          this.message.successMessage('Deleted Successfully');
        } else {
          this.message.successMessage('Marked As Done Successfully');
        }
      });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
