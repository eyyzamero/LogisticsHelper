import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UsersListObservableService } from 'src/app/components/users/services/observable/list/users-list-observable.service';
import { BaseUsersList } from '../../base/users.list.base';

@Component({
  selector: 'app-users-list-accordions',
  templateUrl: './users-list-accordions.component.html',
  styleUrls: ['./users-list-accordions.component.scss']
})
export class UsersListAccordionsComponent extends BaseUsersList {

  constructor(
    usersListObservableService: UsersListObservableService,
    modalController: ModalController,
    translateService: TranslateService
  ) {
    super(usersListObservableService, modalController, translateService);
  }

  toggleAccordion(userId: string) {

  }
}