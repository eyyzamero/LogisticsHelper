import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserManageService } from 'src/app/components/users/services/manage/user-manage.service';
import { UsersListObservableService } from 'src/app/components/users/services/observable/list/users-list-observable.service';
import { LoadingObservableService } from 'src/app/core/services/observable/loading/loading-observable.service';
import { BaseUsersList } from '../../base/users.list.base';

@Component({
  selector: 'app-users-list-accordions',
  templateUrl: './users-list-accordions.component.html',
  styleUrls: ['./users-list-accordions.component.scss']
})
export class UsersListAccordionsComponent extends BaseUsersList {

  openAccordionIds: Array<string> = new Array<string>();

  constructor(
    usersListObservableService: UsersListObservableService,
    modalController: ModalController,
    translateService: TranslateService,
    userManageService: UserManageService,
    loadingObservableService: LoadingObservableService
  ) {
    super(usersListObservableService, modalController, translateService, userManageService, loadingObservableService);
  }

  toggleAccordion(id: string): void {
    const index = this.openAccordionIds.findIndex(x => x === id);

    index === -1
      ? this.openAccordionIds.push(id)
      : this.openAccordionIds.splice(index, 1);
  }
}