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
  constructor(
    private router: Router,
    private todoFilter: TodoFilterService,
    private todoService: TodoDataService
  ) {}

  ngOnInit() {}

  textSearch(searchKey) {
    this.todoFilter.textSearch(searchKey.value);
  }

  showAll() {
    this.todoFilter.showAll();
  }

  addNew() {
    this.router.navigate([
      '/user/' + this.todoService.activeUser + '/todo/new-todo'
    ]);
  }

  categorySearch(data) {
    this.todoFilter.filterSearch('category', data);
  }

  statusSearch(data) {
    this.todoFilter.filterSearch('status', data);
  }

  dateSearch(fromDate: HTMLInputElement, toDate: HTMLInputElement) {
    this.todoFilter.dateFilter(fromDate.value, toDate.value, 'dueDate');
  }
}
