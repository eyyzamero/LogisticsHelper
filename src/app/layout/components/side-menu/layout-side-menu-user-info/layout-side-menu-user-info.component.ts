import { Component } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IAuthModel } from 'src/app/core/models';
import { AuthObservableService } from 'src/app/core/services/observable/auth/auth-observable.service';

@Component({
  selector: 'app-layout-side-menu-user-info',
  templateUrl: './layout-side-menu-user-info.component.html',
  styleUrls: ['./layout-side-menu-user-info.component.scss'],
})
export class LayoutSideMenuUserInfoComponent {

  user$: Observable<IAuthModel | null> = this._authObservableService.observable.pipe(
    tap(x => console.log(x)),
    map(x => x.data)
  );

  constructor(
    private _authObservableService: AuthObservableService
  ) { }
}
