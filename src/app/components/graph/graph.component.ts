import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {StorageService} from "../../services/storage.service";
import {PointFormComponent} from "../point-form/point-form.component";
import {GraphService} from "../../services/graph.service";
import {PointService} from "../../services/point.service";
import {Point} from "../../models/point";

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  pointsEvent: Subscription;
  rEvent: Subscription;

  points: Array<any>;
  r: number;

  constructor(private storageService: StorageService, private graphService: GraphService, private pointService: PointService) {
    this.pointsEvent = this.storageService.event().subscribe((points)=>{
      this.updatePoints(points);
    });

    this.rEvent = this.graphService.rGetEvent().subscribe((r)=>{
      this.setR(r);
    });
  }

  ngOnInit(): void {
    this.storageService.updatePoints();
  }

  clickSvg(evt) {
    let element = evt.target;
    let position = element.getBoundingClientRect();
    let srcX = evt.clientX - position.left;
    let srcY = evt.clientY - position.top;
    let x = (srcX - 150) / 100.0;
    let y = (150 - srcY) / 100.0;
    this.buildClickRequest(x, y);
  }

  buildClickRequest(x, y) {
    x = Number(x);
    y = Number(y);
    x = x * this.r;
    y = y * this.r;
    if (this.r < 0) {
      x = x * (-1);
      y = y * (-1);
    }
    let point = new Point();
    point.x = x;
    point.y = y;
    point.r = this.r.toString();
    this.pointService.newPoint(point)
  }

  setR(r) {
    this.r = r;
    this.updateFigures();
    this.drawPoints();
  }

  updateFigures() {
    let graphic = document.getElementById("graphic");
    if (Number(this.r) === 0) {
      graphic.innerHTML = this.drawGraphEmpty();
    }
    if (Number(this.r) > 0) {
      graphic.innerHTML = this.drawGraph();
    }
    if (Number(this.r) < 0) {
      graphic.innerHTML = this.drawGraphMirror();
    }
  }

  drawGraphEmpty() {
    return "";
  }

  drawGraph() {
    return '<path [className]="figures" d="M 150 200 A 50 50, 90, 0, 0, 200 150 L 150 150 Z"></path>\n' +
        '<polygon class="figures" points="100,150 150,150 150,250, 100,250"/>\n' +
        '<polygon class="figures" points="100,150 150,50 150,150"/>';
  }

  drawGraphMirror() {
    return '<path class="figures" d="M 150 100 A 50 50, 90, 0, 0, 100 150 L 150 150 Z"></path>\n' +
        '<polygon class="figures" points="150,50 200,50 200,150, 150,150"/>\n' +
        '<polygon class="figures" points="150,150 200,150 150,250"/>';
  }

  updatePoints(points) {
    this.points = points;
    this.drawPoints();
  }

  drawPoints() {
    let groupHit = document.getElementById("point-storage-hit");
    let groupNotHit = document.getElementById("point-storage-not-hit");
    let pointsHitResult = "";
    let pointsNotHitResult = "";
    if (this.points === undefined || this.points === null) {
      this.points = new Array();
    }
    for (let i = 0; i < this.points.length; i++) {
      if (Number(this.points[i].r) === Number(this.r)) {
        if (Boolean(this.points[i].hit) === true) {
          pointsHitResult = pointsHitResult + this.getDescriptionPoint(Number(this.points[i].x), Number(this.points[i].y), Number(this.points[i].r));
        } else {
          pointsNotHitResult = pointsNotHitResult + this.getDescriptionPoint(Number(this.points[i].x), Number(this.points[i].y), Number(this.points[i].r));
        }
      }
    }
    try {
      groupHit.innerHTML = pointsHitResult;
      groupNotHit.innerHTML = pointsNotHitResult;
    } catch (e) {
      return;
    }
  }

  getDescriptionPoint(x, y, r) {
    x = Number(x);
    y = Number(y);
    r = Number(r);
    if (r < 0) {
      r = r * (-1);
    }
    x = 150.0 + x * 100.0 / r;
    y = 150.0 - y * 100.0 / r;

    if (r == 0) {
      x = 150;
      y = 150;
    }
    return '<circle r="3" cx="' + x + '" cy="' + y + '"></circle>';
  }

}
