import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';
import { MatSelectModule } from '@angular/material/select';
import { MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  statusOptions = [];
  categoryOptions = [];
  constructor(
    private option: MatSelectModule,
    private router: Router,
    private todoFilter: TodoFilterService,
    private todoService: TodoDataService
  ) {
    this.statusOptions = [
      { value: 'showAll', viewValue: 'Show All' },
      { value: 'done', viewValue: 'Done' },
      { value: 'pending', viewValue: 'Pending' },
      { value: 'overdue', viewValue: 'OverDue' }
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

  categorySearch(data) {
    this.todoFilter.filterSearch('category', data.target.value);
  }

  statusSearch(data) {
    this.todoFilter.filterSearch('status', data.target.value);
  }

  dateSearch(fromDate: HTMLInputElement, toDate: HTMLInputElement) {
    this.todoFilter.dateFilter(fromDate.value, toDate.value, 'dueDate');
  }
}
