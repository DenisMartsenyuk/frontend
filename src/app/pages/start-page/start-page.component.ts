import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Cookie } from 'ng2-cookies';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if ((Cookie.get('bearer_token') !== undefined || Cookie.get('bearer_token') !== null) && Cookie.get('bearer_token').substr(0, 6) === 'Bearer') {
      this.router.navigate(['main']);
    }
  }

}
