import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private r = new Subject<any>();

  constructor() { }

  rSetEvent (r) {
    this.r.next (r);
  }

  rGetEvent (): Observable <any> {
    return this.r.asObservable ();
  }
}
