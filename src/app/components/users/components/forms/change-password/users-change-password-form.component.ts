import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingObservableService } from 'src/app/core/services/observable/loading/loading-observable.service';
import { exactTo } from 'src/app/core/validators';
import { UserManageService } from '../../../services/manage/user-manage.service';
import { BaseUsersForm } from '../base/users-form.base';

@Component({
  selector: 'app-users-change-password-form',
  templateUrl: './users-change-password-form.component.html',
  styleUrls: ['./users-change-password-form.component.scss']
})
export class UsersChangePasswordFormComponent extends BaseUsersForm {

  form: FormGroup = this._formDefinition();

  constructor(
    firestore: AngularFirestore,
    private _loadingObservableService: LoadingObservableService,
    private _userManageService: UserManageService
  ) {
    super(firestore);
  }

  submit(): void {
    if (this.form.valid) {
      this._loadingObservableService.show();
      this._userManageService.changeUserPassword(
        this.user,
        this.form.controls['password'].value,
        () => {
          this._loadingObservableService.hide();
          this.closeModal.emit();
        },
        (errorMessage: string) => {
          this._loadingObservableService.hide();
          this.errorMessage = errorMessage;
        }
      );
    }
  }

  protected _formDefinition(): FormGroup {
    const form = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.PASSWORD_MIN_LENGTH),
        Validators.maxLength(this.PASSWORD_MAX_LENGTH)
      ]),
      passwordConfirm: new FormControl(null, [
        Validators.required,
        Validators.minLength(this.PASSWORD_MIN_LENGTH),
        Validators.maxLength(this.PASSWORD_MAX_LENGTH)
      ])
    }, { 
      validators: exactTo('password', 'passwordConfirm')
    });
    return form;
  }
}