import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private points = new Subject<any>();

  constructor() {
  }

  removePoints() {
    sessionStorage.clear();
    this.updatePoints();
  }

  addPoint(point) {

    let resultPoints = JSON.parse(sessionStorage.getItem('points'));
    if (resultPoints === undefined || resultPoints === null || resultPoints === "") {
      resultPoints = new Array();
    }
    resultPoints.push(point);
    sessionStorage.setItem('points', JSON.stringify(resultPoints));
    this.updatePoints();
  }

  setAllPoints(points) {
    this.removePoints();
    sessionStorage.setItem('points', JSON.stringify(points));
    this.updatePoints();
  }

  updatePoints() {
    let sessionPoints = sessionStorage.getItem('points');
    if (sessionPoints === undefined || sessionPoints === null || sessionPoints === '') {
      this.points.next();
    } else {
      this.points.next(JSON.parse(sessionPoints));
    }
  }

  event(): Observable<any>{
    return this.points.asObservable();
  }


}
