import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreCollection, UserRole } from 'src/app/core/enums';
import { IRoleDbRefModel, IUserDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { UsersMapperService } from '../../services/mapper/users-mapper.service';
import { UsersListObservableService } from '../../services/observable/list/users-list-observable.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  private _roles: Array<IRoleDbRefModel> = new Array<IRoleDbRefModel>();
  private _usersCollectionService: FirestoreCollectionService<IUserDbRefModel>;
  private _rolesCollectionService: FirestoreCollectionService<IRoleDbRefModel>;

  constructor(
    firestore: AngularFirestore,
    private _usersListObservableService: UsersListObservableService,
    private _usersMapperService: UsersMapperService
  ) {
    this._usersCollectionService = new FirestoreCollectionService<IUserDbRefModel>(firestore, FirestoreCollection.USERS);
    this._rolesCollectionService = new FirestoreCollectionService<IRoleDbRefModel>(firestore, FirestoreCollection.ROLES);
  }

  ngOnInit(): void {
    this._getRoles();
    this._getUsers();
  }

  private async _getRoles(): Promise<void> {
    const roles = await this._rolesCollectionService.getAll();

    if (roles)
      this._roles = roles;
  }

  private async _getUsers(): Promise<void> {
    const users = await this._usersCollectionService.getAll();

    if (users) {
      let mappedUsers = this._usersMapperService.ArrayOfIUserDbRefModelToArrayOfIUserModel(users);

      users.forEach(user => {
        let mappedUser = mappedUsers.find(x => x.id === user.id);

        if (mappedUser) {
          const role = this._roles.find(x => x.id === user.roleId)!;
          mappedUser.role = role.name as UserRole;
        }
      });
      this._usersListObservableService.add(mappedUsers);
    };
  }
}