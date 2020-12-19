import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Point } from "../models/point";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root',
})
export class PointService {

  public serverUrl = 'http://localhost:7777';
  public controllerMapping = '/points';


  constructor(private http: HttpClient, private storageService: StorageService) {
  }

  newPoint(point: Point) {
    const body = {
      x: point.x,
      y: point.y,
      r: point.r
    };
    this.http.post(this.serverUrl + this.controllerMapping + '/new', body).subscribe(
        point => this.updateTable(point)
    );
  }

  deletePoints() {
    this.http.delete(this.serverUrl + this.controllerMapping + '/delete').subscribe(
        data => this.clearTable()
    );
  }

  getAllPoints() {
    this.http.get(this.serverUrl + this.controllerMapping + '/all').subscribe(
        data => this.getPoints(data)
    );
  }

  private updateTable(point) {
    this.storageService.addPoint(point);
  }

  getPoints(data) {
    this.storageService.setAllPoints(data);
  }

  private clearTable() {
    this.storageService.removePoints();
  }
}