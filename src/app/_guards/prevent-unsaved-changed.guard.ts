import { CanDeactivate, CanDeactivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root',
})

export class PreventUnsavedChangedGuard implements CanDeactivate<unknown>{
  canDeactivate(component = MemberEditComponent): boolean{
    if(component.editForm.dirty)
        return confirm('Вы уверены что хотите перейти на другую страницу, все несохраненные данные будут утеряны!');
    return true;
  }
}
