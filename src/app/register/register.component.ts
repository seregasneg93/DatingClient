import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate : Date;
  validationErrors : string[] = [];

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    // сделано для того чтобы было старше 18 лет при регистрации, убрал, надо добавить в xml параметр чтобы заработало
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

    initializeForm(){
      this.registerForm = this.fb.group({
        gender: ['male'],
        userName: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
        confirmPassword: ['', [Validators.required, this.matchValues('password')]]
      });
      // это для того что если мы измененим пароли или подтверждение пароля, то эти два поля проверят себя на правильность заполнения
      // и ругнуться если не совпали
        this.registerForm.controls.password.valueChanges.subscribe(()=>{
        this.registerForm.controls.confirmPassword.updateValueAndValidity();
      });
    }

    matchValues(mathTo:string){
      return (control:AbstractControl) => {
        return control?.value === control?.parent?.controls[mathTo].value
                              ? null : {isMatching : true};
      }
    }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      (responce) => {
        this.router.navigateByUrl('/members');
      },
      (error) => this.validationErrors = error
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
