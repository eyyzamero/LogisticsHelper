import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  form: FormGroup = this._initForm();

  get formControls() {
    return this.form.controls;
  }

  constructor(
    private _router: Router,
    private _authService: AngularFireAuth
  ) { }

  login(): void {
    if (this.form.valid) {
      this._authService.signInWithEmailAndPassword(
        this.formControls['login'].value,
        this.formControls['password'].value
      ).then(result => {
        if (result.user)
          this._navigateToHomePage();
      });
    }
  }

  private _initForm(): FormGroup {
    const form = new FormGroup({
      login: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
    return form;
  }

  private _navigateToHomePage(): void {
    this._router.navigate(['home']);
  }
}