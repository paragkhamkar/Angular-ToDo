import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoFilterService } from '../../services/todo-filter.service';
import { TododataService } from '../../services/tododata.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  statusOptions = [];
  categoryOptions = [];
  constructor(
    private router: Router,
    private todoFilter: TodoFilterService,
    private todoService: TododataService
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
    this.todoFilter.isDataAvailable.next(true);
    this.router.navigate(['/todo/new']);
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
