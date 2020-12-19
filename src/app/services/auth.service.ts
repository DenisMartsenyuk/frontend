import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import { User } from '../models/user';
import { Router } from "@angular/router";
import { PointService } from "./point.service";
import {StorageService} from "./storage.service";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

  public serverUrl = 'http://localhost:7777';
  public controllerMapping = '/user';

  constructor(private http: HttpClient, private router: Router, private pointService: PointService, private storageService: StorageService) { }

  login(user: User){
    const body = {
      username: user.username,
      password: user.password
    };
    this.logout();
    this.http.post(this.serverUrl + this.controllerMapping + '/login', body).subscribe(
        data => this.initUser(data),
        error => this.messageNotLogin()
    );
  }


  register(user: User){
    const body = {
      username: user.username,
      password: user.password,
    };
    this.http.post(this.serverUrl + this.controllerMapping + '/register', body).subscribe(
        data => this.messageNotRegister(),
        error => this.messageNotRegister()
    );
  }

  private initUser(data) {
    this.saveToken(data);
    this.pointService.getAllPoints();
    this.router.navigate(['/main']);
  }

  private saveToken(data) {
    Cookie.set("bearer_token", 'Bearer ' + data.token.toString());
  }

  private messageNotLogin() {
    console.log("Войти не удалось. Пользователь не существует или данные некорректны."); //todo заменить на тост
  }

  private messageNotRegister() {
    console.log("Зарегистрироваться не удалось. Пользователь уже существует."); //todo заменить на тост
  }

  private messageRegister() {
    console.log("Пользователь зарегистрирован!"); //todo заменить на тост
  }

  logout() {
    Cookie.delete('bearer_token');
    this.storageService.removePoints();
    this.router.navigate(['/auth'])
  }
}
