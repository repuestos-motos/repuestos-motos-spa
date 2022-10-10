import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  public preloaderSubj: Subject<boolean>;

  constructor() {
    this.preloaderSubj = new Subject<boolean>();
  }

  subscribe(s: {next: any}) {
    return this.preloaderSubj.subscribe(s);
  }

  block() {
    this.preloaderSubj.next(true);
  }

  unblock() {
    this.preloaderSubj.next(false);
  }
}
