import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UsersFormModalComponent } from './components/modals/users-form-modal/users-form-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(
    private _modalController: ModalController,
    private _translateService: TranslateService
  ) { }

  openAddUserModal() {
    this._modalController.create({
      component: UsersFormModalComponent,
      componentProps: {
        title: this._translateService.instant('users.add')
      },
      cssClass: 'modal',
      backdropDismiss: false
    }).then(x => x.present()); 
  }
}