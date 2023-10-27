import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {};

  constructor(public accountServie: AccountService){}

  ngOnInit(): void {

  }

  login(){
    this.accountServie.login(this.model).subscribe(responce=>{
      console.log(responce);
    },error=>{
      console.log(error)
    })
  }

  logOut(){
    this.accountServie.logOut();
  }
}
