import { Injectable } from '@angular/core';
import { ObservableMapperService } from 'src/app/core/services/mapper';
import { BaseBehaviorSubjectObservableService } from 'src/app/core/services/observable/base-behavior-subject/base-behavior-subject-observable.service';
import { IUserModel } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class UsersListObservableService extends BaseBehaviorSubjectObservableService<Array<IUserModel>> {

  constructor(
    observableMapperService: ObservableMapperService
  ) {
    super(new Array<IUserModel>(), observableMapperService);
  }

  addUser(user: IUserModel) {
    this.observableSubjectValue.data.push(user);
    this.next();
  }

  editUser(value: IUserModel) {
    let userIndex = this.observableSubjectValue.data.findIndex(x => x.id === value.id);

    if (userIndex !== -1) {
      this.observableSubjectValue.data[userIndex] = value;
      this.next();
    }
  }

  deleteUser(userId: string) {
    const userIndex = this.observableSubjectValue.data.findIndex(x => x.id === userId);

    if (userIndex !== -1) {
      this.observableSubjectValue.data.splice(userIndex, 1);
      this.next();
    }
  }
  
  updatePassword(id: string, password: string): void  {
    let user = this.observableSubjectValue.data.find(x => x.id === id);

    if (user) {
      user.password = password;
      this.next();
    }
  }

  changeEmail(id: string, email: string) {
    let user = this.observableSubjectValue.data.find(x => x.id === id);

    if (user) {
      user.email = email;
      this.next();
    }
  }
}