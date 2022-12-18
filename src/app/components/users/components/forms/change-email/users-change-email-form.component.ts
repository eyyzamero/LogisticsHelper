import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseUsersForm } from '../base/users-form.base';
import { LoadingObservableService } from 'src/app/core/services/observable/loading/loading-observable.service';
import { UserManageService } from '../../../services/manage/user-manage.service';

@Component({
  selector: 'app-users-change-email-form',
  templateUrl: './users-change-email-form.component.html',
  styleUrls: ['./users-change-email-form.component.scss']
})
export class UsersChangeEmailFormComponent extends BaseUsersForm {

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
      this._userManageService.changeEmail(
        this.user,
        this.form.controls['email'].value,
        () => {
          this._loadingObservableService.hide();
          this.closeModal.emit();
        },
        (errorMessage: string) => {
          this._loadingObservableService.hide();
          this.errorMessage = errorMessage;
        }
      )
    }
  }

  protected _formDefinition(): FormGroup {
    const form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
    });
    return form;
  }
}