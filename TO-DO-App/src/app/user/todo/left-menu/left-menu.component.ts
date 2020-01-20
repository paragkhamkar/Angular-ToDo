import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoFilterService } from 'src/app/shared/services/todo-filter.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor(private router:Router,
              private todoFilter:TodoFilterService) { }

  ngOnInit() {
  
  }

  addNew(){
    this.router.navigate(['/user/'+localStorage.getItem("localId")+'/todo/new-todo'])
  }

  categorySearch(data){
    console.log('clicked')
    this.todoFilter.filterSearch('category' , data)
  }
}
