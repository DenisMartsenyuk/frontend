import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { ButtonModule } from 'primeng/button';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { User } from './models/user';
import { TableComponent } from './components/table/table.component';
import {GraphComponent} from "./components/graph/graph.component";
import { PointFormComponent } from './components/point-form/point-form.component';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import {TokenInterceptor} from "./security/token-Interceptor";
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import {StorageService} from "./services/storage.service";
import {PointService} from "./services/point.service";
import { CustomFooterComponent } from './components/custom-footer/custom-footer.component';

const routes: Routes =[
    {path: 'auth', component: StartPageComponent},
    {path: 'main', component: MainPageComponent},
    {path: '**', component: ErrorPageComponent}
];

@NgModule({
    imports: [BrowserModule, FormsModule, ButtonModule, HttpClientModule, PasswordModule, InputTextModule, TableModule, RadioButtonModule , InputNumberModule, RouterModule.forRoot(routes), ReactiveFormsModule],
    declarations: [ AppComponent, StartPageComponent, MainPageComponent, AuthComponent, TableComponent, GraphComponent, PointFormComponent, CustomHeaderComponent, ErrorPageComponent, CustomFooterComponent ],
    bootstrap:    [ AppComponent ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        StorageService, PointService
    ]
})
export class AppModule {
    person: User;

    constructor(private http: HttpClient) {}

    ngOnInit(){
    }
}
