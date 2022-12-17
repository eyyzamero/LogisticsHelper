import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {

  constructor(
    private _modalController: ModalController
  ) { }

  close(): void {
    this._modalController.dismiss(false);
  }

  confirm(): void {
    this._modalController.dismiss(true);
  }
}
