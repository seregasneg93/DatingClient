import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { BusyService } from '../_services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyServices: BusyService) {}
 // перехватичк для показа загрузки на форме
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyServices.busy();
    return next.handle(request).pipe(
      delay(1000),
      finalize(()=>{
        this.busyServices.idle();
      })
    );
  }
}
