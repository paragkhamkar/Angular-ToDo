import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { TodoDataService } from 'src/app/shared/services/todo-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = 'ajcasjcnasjncn';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private todoService: TodoDataService
  ) {}

  ngOnInit() {}

  navigate(page) {
    switch (page) {
      case 0:
        this.router.navigate(['./todo/private'], { relativeTo: this.route });
        break;
      case 1:
        this.router.navigate(['./todo/public'], { relativeTo: this.route });
        break;
      case 2:
        this.router.navigate(['./profile'], { relativeTo: this.route });
        break;
      default:
        this.messageService.errorMessage('Access Denied');
      // this.router.navigate(['./todo/trash'], { relativeTo: this.route });
    }
  }

  logout() {
    this.messageService.successMessage('Logged Out Successfully');
    localStorage.clear();
    this.todoService.logout();
  }
}
