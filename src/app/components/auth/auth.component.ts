import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from "primeng/api";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  user: User = new User();

  msgs: [];

  constructor(private authService: AuthService, private messageService: MessageService) { };

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
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    console.log('Введите логин и пароль');
  }

}
