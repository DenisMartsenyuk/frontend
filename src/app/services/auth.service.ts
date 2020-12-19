import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies';
import { User } from '../models/user';
import { Router } from "@angular/router";
import { PointService } from "./point.service";
import {StorageService} from "./storage.service";
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

  public serverUrl = 'http://localhost:7777';
  public controllerMapping = '/user';

  private message = new Subject<any>();


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
    this.messageSetEvent("Войти не удалось. Пользователь не существует или данные некорректны.");
  }

  private messageNotRegister() {
    this.messageSetEvent("Зарегистрироваться не удалось. Пользователь уже существует.");
  }

  logout() {
    Cookie.delete('bearer_token');
    this.storageService.removePoints();
    this.router.navigate(['/auth'])
  }

  messageSetEvent(message) {
    this.message.next(message);
  }

  messageGetEvent(): Observable <any> {
    return this.message.asObservable ();
  }
}
