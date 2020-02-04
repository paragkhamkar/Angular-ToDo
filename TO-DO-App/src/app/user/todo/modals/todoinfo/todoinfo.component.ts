import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from 'src/app/shared/data.model';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-todoinfo',
  templateUrl: './todoinfo.component.html',
  styleUrls: ['./todoinfo.component.css']
})
export class TodoinfoComponent implements OnInit {
  todo: TodoItem;

  constructor(
    private todoService: TodoDataService,
    private message: MessagesService,
    public dialogRef: MatDialogRef<TodoinfoComponent>,
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
    this.todoService.markDone(id);
    this.message.successMessage('Marked As Done');
  }

  deleteTodo(id) {
    this.todoService.delete(id);
    this.message.errorMessage('Deleted Sucessfully');
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
