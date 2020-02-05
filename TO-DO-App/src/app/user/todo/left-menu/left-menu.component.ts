import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  statusOptions = [];
  categoryOptions = [];
  constructor(
    private router: Router,
    private todoFilter: TodoFilterService,
    private todoService: TodoDataService
  ) {
    this.statusOptions = [
      { value: 'showAll', viewValue: 'Show All' },
      { value: 'done', viewValue: 'Done' },
      { value: 'pending', viewValue: 'Pending' }
    ];
    this.categoryOptions = [
      { value: 'showAll', viewValue: 'Show All' },
      { value: 'Home', viewValue: 'Home' },
      { value: 'Work', viewValue: 'Work' },
      { value: 'School', viewValue: 'School' }
    ];
  }

  ngOnInit() {}

  textSearch(searchKey) {
    this.todoFilter.textSearch(searchKey.value);
  }

  showAll() {
    this.todoFilter.showAll();
  }

  addNew() {
    this.todoFilter.getDataAvailability.next(true);
    this.router.navigate([
      '/user/' + this.todoService.activeUser + '/todo/new-todo'
    ]);
  }

  categorySearch(event) {
    if (event.target.value === 'showAll') {
      this.showAll();
    } else {
      this.todoFilter.filterSearch('category', event.target.value);
    }
    event.target.selectedIndex = 0;
  }

  statusSearch(event) {
    if (event.target.value === 'showAll') {
      this.showAll();
    } else {
      this.todoFilter.filterSearch('status', event.target.value);
    }
    event.target.selectedIndex = 0;
  }

  dateSearch(fromDate: HTMLInputElement, toDate: HTMLInputElement) {
    this.todoFilter.dateFilter(fromDate.value, toDate.value, 'dueDate');
  }
}
