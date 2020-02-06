import { Component, OnInit, OnDestroy } from '@angular/core';
import { TododataService } from '../../services/tododata.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoItem } from 'src/app/shared/data.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit, OnDestroy {
  isPublic: boolean = false;
  paramSubscription: Subscription;
  deletePublic: Subscription;
  deletePrivate: Subscription;
  addPrivate: Subscription;
  addPublic: Subscription;

  todoForm: FormGroup;
  todoId: string;
  editMode: boolean;
  todoItem: TodoItem;

  constructor(
    private todoService: TododataService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessagesService
  ) {
    this.todoId = '';
    this.editMode = false;
    this.paramSubscription = route.params.subscribe((params: Params) => {
      this.todoId = params.id;
    });
  }

  ngOnInit() {
    this.todoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      desc: new FormControl(null),
      dueDate: new FormControl(
        this.todoService.toDate(new Date()),
        Validators.required
      ),
      reminderDate: new FormControl(this.todoService.toDate(new Date())),
      category: new FormControl('Home'),
      isPublic: new FormControl('No')
    });
    if (this.todoId) {
      this.editMode = true;
      this.todoItem = this.todoService.getItem(this.todoId);
      if (this.todoItem) {
        this.setForm();
      } else {
        console.error('Unable to Load sdsd Details');
        this.editMode = false;
      }
    }
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

  submit() {
    const today = this.todoService.toDate(new Date());
    const reminder = this.todoService.toDate(
      new Date(this.todoForm.value.reminderDate)
    );
    const due = this.todoService.toDate(new Date(this.todoForm.value.dueDate));

    if (due < today || due < reminder || reminder < today) {
      this.message.errorMessage('Please Enter Valid Dates');
      return false;
    }
    const todo = {
      owner: this.todoService.getUserId(),
      title: this.todoForm.value.title,
      desc: this.todoForm.value.desc || 'No Description',
      dueDate: this.todoService.toDate(new Date(this.todoForm.value.dueDate)),
      reminderDate: this.todoService.toDate(
        new Date(this.todoForm.value.reminderDate)
      ),
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

    if (this.editMode) {
      todo.todoID = this.todoItem.todoID;
      if (this.todoItem.isPublic === todo.isPublic) {
        this.addTodo(todo);
      } else {
        this.swapPrivacy(todo);
      }
    } else {
      this.addTodo(todo);
    }
  }

  addTodo(todo) {
    if (todo.isPublic) {
      this.addPublicTodo(todo);
    } else {
      this.addPrivateTodo(todo);
    }
  }

  addPublicTodo(todo) {
    this.addPublic = this.todoService.addPublicTodo(todo).subscribe(
      resolve => {
        this.todoService.afterPublicAdded(todo);
      },
      err => {
        this.todoService.failedToUpdate(err);
      }
    );
  }

  addPrivateTodo(todo) {
    this.addPrivate = this.todoService.addPrivateTodo(todo).subscribe(
      resolve => {
        this.todoService.afterPrivateAdded(todo);
      },
      err => {
        this.todoService.failedToUpdate(err);
      }
    );
  }

  swapPrivacy(todo) {
    if (this.isPublic) {
      this.swapPrivateToPublic(todo);
    } else {
      this.swapPublicToPrivate(todo);
    }
  }

  swapPrivateToPublic(todo) {
    this.deletePrivate = this.todoService
      .deleteFromPrivate(todo.todoID)
      .subscribe(
        res => {
          todo.status = 'pending';
          this.todoService.privateTodoData[todo.todoID].status = 'deleted';
          this.addPublicTodo(todo);
        },
        err => {
          console.log('Error');
        }
      );
  }

  swapPublicToPrivate(todo) {
    this.deletePublic = this.todoService
      .deleteFromPublic(todo.todoID)
      .subscribe(
        res => {
          todo.status = 'pending';
          this.todoService.publicTodoData[todo.todoID].status = 'deleted';
          this.addPrivateTodo(todo);
        },
        err => {
          console.log('Error');
        }
      );
  }

  ngOnDestroy() {
    this.addPrivate == null ? null : this.addPrivate.unsubscribe();
    this.addPublic == null ? null : this.addPublic.unsubscribe();
    this.deletePublic == null ? null : this.deletePublic.unsubscribe();
    this.deletePrivate == null ? null : this.deletePrivate.unsubscribe();
  }

  goBack() {
    if (this.isPublic) {
      this.router.navigate(['/todo', 'list', 'public']);
    } else {
      this.router.navigate(['/todo', 'list', 'private']);
    }
  }
}
