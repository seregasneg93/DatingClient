import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './input-text-input.component.html',
  styleUrls: ['./input-text-input.component.css']
})
// здесь делаем валидацию передаем сюда данные, тем самым на форме где валидация сокращается место
export class InputTextInputComponent implements ControlValueAccessor {
  @Input() label:string;
  @Input() type = 'text';

  constructor(@Self() public ngControl: NgControl){
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }
}
