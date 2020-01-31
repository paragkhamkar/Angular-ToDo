import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  dataAvaliable = true;
  showMenu: boolean;
  showFilter: Subscription;
  getAvailability: Subscription;

  constructor(
    private todoService: TodoDataService,
    private filterService: TodoFilterService
  ) {
    this.showFilter = this.todoService.showFilters.subscribe(
      value => (this.showMenu = value)
    );
    this.getAvailability = filterService.getDataAvailability.subscribe(
      value => (this.dataAvaliable = value)
    );
    this.todoService.showFilters.next(true);
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.showFilter.unsubscribe();
    this.getAvailability.unsubscribe();
  }
}
