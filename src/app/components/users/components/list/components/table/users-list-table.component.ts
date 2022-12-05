import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersListObservableService } from 'src/app/components/users/services/observable/list/users-list-observable.service';
import { BaseUsersList } from '../../base/users.list.base';

@Component({
  selector: 'app-users-list-table',
  templateUrl: './users-list-table.component.html',
  styleUrls: ['./users-list-table.component.scss']
})
export class UsersListTableComponent extends BaseUsersList {

  constructor(
    firestore: AngularFirestore,
    authService: AngularFireAuth,
    usersListObservableService: UsersListObservableService
  ) {
    super(firestore, authService, usersListObservableService);
  }
}