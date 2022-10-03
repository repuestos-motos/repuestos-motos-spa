import { Injectable } from '@angular/core';
import { Toast } from '../interface/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toasts: Toast[] = [];

  constructor() { }

  add(header: string, body: string = '', delay: number = 5000) {
    const toast = {
      uid: (new Date()).valueOf(),
      header,
      body,
      delay
    };
    this.toasts.push(toast);
    setTimeout(() => {
      this.remove(toast)
    }, delay);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => toast.uid !== t.uid);
  }
}
