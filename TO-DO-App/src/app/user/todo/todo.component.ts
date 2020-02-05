import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  recordsAvailable = true;
  dataAvaliable = true;
  showMenu = true;
  showFilter: Subscription;
  isFilteredDataAvailable: Subscription;
  isRecordAvailable: Subscription;

  constructor(
    private todoService: TodoDataService,
    private filterService: TodoFilterService,
    private router: Router
  ) {
    this.showFilter = this.todoService.showFilters.subscribe(
      value => (this.showMenu = value)
    );
    this.isFilteredDataAvailable = filterService.getDataAvailability.subscribe(
      value => (this.dataAvaliable = value)
    );
    this.isRecordAvailable = todoService.isRecordAvailabe.subscribe(
      value => (this.recordsAvailable = value)
    );
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnInit() {}
  addNew() {
    this.dataAvaliable = true;
    this.recordsAvailable = true;
    this.showMenu = false;
    this.router.navigate([
      '/user/' + this.todoService.activeUser + '/todo/new-todo'
    ]);
  }
  ngOnDestroy() {
    this.showFilter.unsubscribe();
    this.isFilteredDataAvailable.unsubscribe();
  }
}
