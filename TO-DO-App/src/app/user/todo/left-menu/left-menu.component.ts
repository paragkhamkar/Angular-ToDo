import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  addNew(){
    this.router.navigate(['/user/'+localStorage.getItem("UserEmail")+'/todo/new-todo'])
  }
}
