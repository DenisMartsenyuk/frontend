import {Component, Injectable, OnInit} from '@angular/core';
import {PointService} from "../../services/point.service";
import {Point} from "../../models/point";
import {GraphService} from "../../services/graph.service";

@Component({
  selector: 'point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.css']
})
export class PointFormComponent implements OnInit {

  x: string = '-4';
  y: string;
  r: string = '-4';

  constructor(private pointService: PointService, private graphService: GraphService) {
  }

  ngOnInit(): void {

    this.changeR(this);
  }

  newPoint() {
    if(this.y === undefined || this.y === null || this.y === "") {
      this.y = "0";
    }
    let point = new Point(this.x, this.y, this.r);
    this.pointService.newPoint(point);
  }

  deletePoints() {
    this.pointService.deletePoints();
  }

  changeR(element) {
    this.graphService.rSetEvent(Number(element.r));
  }

}
