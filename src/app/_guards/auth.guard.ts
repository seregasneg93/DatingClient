import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currenUser$.pipe(
      map((user) => {
        if (user) return true;
        else {
          this.toastr.error('Ты не пройдешь');
          return false;
        }
      })
    );
  }
}
