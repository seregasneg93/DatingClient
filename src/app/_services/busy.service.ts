import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  bisyRequestCount = 0;
  constructor(private spinnerService:NgxSpinnerService) { }

  busy(){
    this.bisyRequestCount++;
    this.spinnerService.show(undefined,{
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333'
    })
  }

  idle(){
    this.bisyRequestCount--;
    if(this.bisyRequestCount <=0){
      this.bisyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
