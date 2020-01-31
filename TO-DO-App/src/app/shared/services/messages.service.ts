import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  error = new Subject<{ display: boolean; show: string }>();
  success = new Subject<{ display: boolean; show: string }>();
  info = new Subject<{ display: boolean; show: string }>();
  spinner = new Subject<boolean>();

  constructor() {}

  infoMessage(message) {
    this.info.next({ display: true, show: message });
    setTimeout(() => {
      this.info.next({ display: false, show: null });
    }, 3000);
  }

  successMessage(message) {
    this.success.next({ display: true, show: message });
    setTimeout(() => {
      this.success.next({ display: false, show: null });
    }, 3000);
  }

  errorMessage(message) {
    this.error.next({ display: true, show: message });
    setTimeout(() => {
      this.error.next({ display: false, show: null });
    }, 3000);
  }

  activateSpinner() {
    this.spinner.next(true);
  }

  deactivateSpinner() {
    this.spinner.next(false);
  }
}
