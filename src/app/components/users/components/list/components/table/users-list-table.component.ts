import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UsersListObservableService } from 'src/app/components/users/services/observable/list/users-list-observable.service';
import { BaseUsersList } from '../../base/users.list.base';

@Component({
  selector: 'app-users-list-table',
  templateUrl: './users-list-table.component.html',
  styleUrls: ['./users-list-table.component.scss']
})
export class UsersListTableComponent extends BaseUsersList {

  constructor(
    usersListObservableService: UsersListObservableService,
    modalController: ModalController,
    translateService: TranslateService
  ) {
    super(usersListObservableService, modalController, translateService);
  }
}