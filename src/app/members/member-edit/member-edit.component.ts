import { ToastrService } from 'ngx-toastr';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

@ViewChild('editForm') editForm: NgForm;
member:Member;
user:User;
static editForm: any;
// отслеживание если мы хотим закрыть браузер или что-то другое которые выходи тза рамки нашего проекта, чтобы оповещение
//об изменении данных так же появлялись
@HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
  if(this.editForm.dirty){
    $event.returnValue = true;
  }
}

constructor(private accountService:AccountService,private memberService:MembersService,
            private toastr:ToastrService){
  this.accountService.currenUser$.pipe(take(1)).subscribe(user=> this.user = user);
};

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.userName).subscribe(member=>{
      this.member = member;
    });
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(()=>{
      this.toastr.success('Профиль изменен!');
      this.editForm.reset(this.member);
    });
  }
}
