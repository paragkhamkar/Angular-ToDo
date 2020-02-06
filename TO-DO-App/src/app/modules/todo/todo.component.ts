import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';
import { TododataService } from './services/tododata.service';
import { TodoObject } from 'src/app/shared/data.model';
import { Subscription } from 'rxjs';
import { TodoFilterService } from './services/todo-filter.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, AfterViewChecked, OnDestroy {
  recordAvailable: boolean = false;
  dataAvailable: boolean = true;
  loadPrivateTodo: Subscription;
  loadPublicTodo: Subscription;
  isRecordsAvailable: Subscription;
  isDataAvailable: Subscription;

  constructor(
    private todoService: TododataService,
    private filterService: TodoFilterService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadPrivateTodo = this.todoService
      .getPrivate()
      .subscribe((result: TodoObject) => {
        this.todoService.setPrivate(result);
      }, this.todoService.failedToUpdate);

    this.loadPublicTodo = this.todoService
      .getPublic()
      .subscribe((result: TodoObject) => {
        this.todoService.setPublic(result);
      }, this.todoService.failedToUpdate);
  }

  ngAfterViewChecked() {
    this.isRecordsAvailable = this.todoService.isRecordAvailabe.subscribe(
      value => {
        this.recordAvailable = value;
      }
    );

    this.isDataAvailable = this.filterService.isDataAvailable.subscribe(
      value => {
        this.dataAvailable = value;
      }
    );
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.isRecordsAvailable.unsubscribe();
    this.isDataAvailable.unsubscribe();
    this.loadPrivateTodo.unsubscribe();
    this.loadPublicTodo.unsubscribe();
  }
}
