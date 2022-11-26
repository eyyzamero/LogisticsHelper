import { Directive } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Directive()
export abstract class BaseAssignmentsModal {

  constructor(
    private _modalController: ModalController
  ) { }

  close(): void {
    this._modalController.dismiss();
  }
}