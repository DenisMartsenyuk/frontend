import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  user: User = new User();

  msgs: [];

  constructor(private authService: AuthService) { };

  ngOnInit(): void {
  }

  login(user: User) {
    if (this.user.password === null || this.user.password === undefined || this.user.password === "" ||
        this.user.username === null || this.user.username === undefined || this.user.username === "") {
          this.addSingle();
          return;
    }
    this.authService.login(user);
  }

  register(user: User) {
    if (this.user.password === null || this.user.password === undefined || this.user.password === "" ||
        this.user.username === null || this.user.username === undefined || this.user.username === "") {
          this.addSingle();
          return;
    }
    this.authService.register(user);
  }

  addSingle() {
    console.log('Введите логин и пароль');
  }

}
