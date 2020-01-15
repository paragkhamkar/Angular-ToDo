import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
