import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Route,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from './shared/services/user-auth.service';
import { TodoDataService } from './shared/services/todo-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: UserAuthService,
    private todoService: TodoDataService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.todoService.activeUser === '') {
      this.router.navigate(['/auth', 'login']);
      return false;
    }
    return true;
  }
}
