import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-change-password-form',
  templateUrl: './users-change-password-form.component.html',
  styleUrls: ['./users-change-password-form.component.scss']
})
export class UsersChangePasswordFormComponent {

  @Input() userId: string = '';

  form: FormGroup = this._formDefinition();

  constructor() { }

  submit(): void {

  }

  private _formDefinition(): FormGroup {
    const form = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ])
    });
    return form;
  }
}