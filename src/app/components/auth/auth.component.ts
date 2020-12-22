import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {Subscription} from "rxjs";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  user: User = new User();
  message: string;
  eventMessage: Subscription;
  typeMessage: string;

  constructor(private authService: AuthService) { };

  ngOnInit(): void {
    this.eventMessage = this.authService.messageGetEvent().subscribe((message)=>{
      this.setMessage(message);
    });
  }

  login(user: User) {
    if (this.user.password === null || this.user.password === undefined || this.user.password === "" ||
        this.user.username === null || this.user.username === undefined || this.user.username === "") {
          this.fieldsError();
          return;
    }
    this.authService.login(user);
  }

  register(user: User) {
    if (this.user.password === null || this.user.password === undefined || this.user.password === "" ||
        this.user.username === null || this.user.username === undefined || this.user.username === "") {
          this.fieldsError();
          return;
    }
    this.authService.register(user);
  }

  fieldsError() {
    this.setMessage('Ошибка: Введите логин и пароль');
  }

  setMessage(message) {
    if (message.substr(0, 6) == "Ошибка") {
      this.typeMessage = 'error-message';
    } else {
      this.typeMessage = 'info-message';
    }
    this.message = message;
  }

  dropMessage() {
    this.message ='';
  }

}
