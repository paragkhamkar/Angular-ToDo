import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from 'src/app/shared/data.model';

@Component({
  selector: 'app-todoinfo',
  templateUrl: './todoinfo.component.html',
  styleUrls: ['./todoinfo.component.css']
})
export class TodoinfoComponent implements OnInit {

  todo:TodoItem;

  constructor(public dialogRef: MatDialogRef<TodoinfoComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.todo = data
    // this.todo.title = "aksjchkjahc"
    // this.todo.desc = "clakscmlaskmclaksmclakmsc"
    // this.todo.dueDate = "78-98-8978"
   }

  ngOnInit() {
  }

  actionFunction() {
    alert("You have logged out.");
    this.closeModal();
  }

  closeModal() {
    this.todo = null;
    this.dialogRef.close();
  }

}
