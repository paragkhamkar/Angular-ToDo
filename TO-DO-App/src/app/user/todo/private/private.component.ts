import { Component, OnInit } from '@angular/core';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  todos:{}[] = [
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"},
    {title:"test", reminderDate:"2012-25-12", category:"Home", duedate:"22-22-2022"}
  ]

  constructor(private todoService:TodoDataService) {
    this.todoService.setIsToDo(true);
   }

  ngOnInit() {
  }

}
