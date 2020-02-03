import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';
import { Subscribable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
    private filterService: TodoFilterService,
    private router: Router
  ) {
    this.showFilter = this.todoService.showFilters.subscribe(
      value => (this.showMenu = value)
    );
    this.getAvailability = filterService.getDataAvailability.subscribe(
      value => {
        console.log('value changed : ', value);
        this.dataAvaliable = value;
      }
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
  addNew() {
    console.log('kcajscksjn');
    this.dataAvaliable = true;
    this.router.navigate([
      '/user/' + this.todoService.activeUser + '/todo/new-todo'
    ]);
  }
  ngOnDestroy() {
    this.showFilter.unsubscribe();
    this.getAvailability.unsubscribe();
  }
}
