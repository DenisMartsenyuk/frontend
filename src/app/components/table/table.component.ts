import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {

    eventSubscription: Subscription;

    points: [];

    constructor(private storageService: StorageService) {
        this.eventSubscription = this.storageService.event().subscribe((points)=>{
            this.setPoints(points);
        });
    }

    ngOnInit(): void {
        this.storageService.updatePoints();
    }

    setPoints (points) {
        this.points = points;
    }

}