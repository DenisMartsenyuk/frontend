import { Component, OnInit } from '@angular/core';
import {Cookie} from "ng2-cookies";
import {Router} from "@angular/router";

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (Cookie.get('bearer_token') === '' || Cookie.get('bearer_token') === undefined || Cookie.get('bearer_token') === null) {
      this.router.navigate(['auth']);
    }
  }

}
