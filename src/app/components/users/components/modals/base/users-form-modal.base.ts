import { Directive, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { IUserModel, UserModel } from "../../../models";

@Directive()
export abstract class BaseUsersFormModal {

  @Input() title: string = '';
  @Input() user: IUserModel = new UserModel();

  constructor(
    private _modalController: ModalController
  ) { }

  abstract submit(): void;

  close() {
    this._modalController.dismiss();
  }
}