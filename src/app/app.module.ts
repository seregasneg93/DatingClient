import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interseptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interseptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interseptors/loading.interceptor';
import { InputTextInputComponent } from './_forms/input-text-input/input-text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';


@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, RegisterComponent,
                 MemberListComponent, MemberDetailComponent, ListsComponent, MessagesComponent,
                 TestErrorsComponent, NotFoundComponent, ServerErrorComponent, MemberCardComponent, MemberEditComponent,
                 InputTextInputComponent,
                 DateInputComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    //указываем свой перехватчик ошибок
    {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor, multi:true},
    // перехватчик для сохранения токена
    {provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi:true},
    // перехватчик для показа загрузки на странице
    {provide: HTTP_INTERCEPTORS,useClass: LoadingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
