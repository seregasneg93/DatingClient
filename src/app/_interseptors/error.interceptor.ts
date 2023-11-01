import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationEnd, NavigationExtras, Route, Router } from '@angular/router';

// перехватчик событий для ошибок
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
        if(error){
          switch (error.status) {
            case 400:
              if(error.error.errors){
                const modelStatusError = [];
                for (const key in error.error.errors) {
                  if(error.error.errors[key])
                    modelStatusError.push(error.error.errors[key]);
                }
                throw modelStatusError.flat();
              }
              else{
                this.toastr.error(error.statusText,error.status);
              }
              break;
            case 401:
              this.toastr.error(error.error,error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              // перехватываем исключение из http запроса
              const navigateExstras: NavigationExtras = {state:{error:error.error}}
              this.router.navigateByUrl('/server-error',navigateExstras);
              break;
            default:
              this.toastr.error('Что-то пошло не так...')
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
