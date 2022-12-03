import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'src/app/core/enums';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent {

  @ViewChild('formRef', { static: true }) formRef?: HTMLFormElement
  
  @Input() set mode(value: FormMode) {

  }

  get mode() {
    return this._mode;
  }

  form: FormGroup = this._formDefinition();

  private _mode: FormMode = FormMode.NONE;

  constructor() { }

  submitClicked() {
    this.formRef?.submit();
  }

  onFormSubmit() {
    console.log("submitted");
  }

  private _formDefinition(): FormGroup {
    return new FormGroup({
      nickname: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
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
  }
}