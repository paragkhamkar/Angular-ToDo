import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from './shared/services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TO-DO-App';
  isRoot = true;

  isError = false;
  isSuccess = false;
  isInfo = false;
  message = "";
  isLoading = false;

  constructor(
    private router:Router,
    private messageService:MessagesService){
  
  messageService.info.subscribe((value) =>{
    this.isInfo = value.display;
    this.message = value.show;
  })
  messageService.success.subscribe((value)=> {
    this.isSuccess = value.display;
    this.message = value.show;
    });

  messageService.error.subscribe((value)=> {
    this.isError = value.display;
    this.message = value.show;
    });
  messageService.spinner.subscribe(value => this.isLoading = value)
}

  ngOnInit(){
    // this.router.navigate(["/auth/login"])
  }

}
