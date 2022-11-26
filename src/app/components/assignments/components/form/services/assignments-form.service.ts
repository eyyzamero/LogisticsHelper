import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetOptions, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AssignmentsFormAddPalletModalComponent } from '../components/modals/add-pallet/assignments-form-add-pallet-modal.component';
import { AssignmentsFormTcModalComponent } from '../components/modals/add-tcs/assignments-form-tc-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsFormService {

  constructor(
    private _router: Router,
    private _translateService: TranslateService,
    private _modalController: ModalController
  ) { }

  getAddActionSheetControllerOptions(assignmentId: string): ActionSheetOptions {
    const options = {
      cssClass: 'action-sheet',
      buttons: [
        {
          text: this._translateService.instant('assignments.add-pallet'),
          icon: 'add-outline',
          handler: async () => (await this._modalController.create({
            component: AssignmentsFormAddPalletModalComponent,
            componentProps: {
              _assignmentId: assignmentId
            },
            cssClass: 'modal',
            backdropDismiss: false
          })).present()
        },
        {
          text: this._translateService.instant('assignments.add-tc'),
          icon: 'cube-outline',
          handler: async () => (await this._modalController.create({
            component: AssignmentsFormTcModalComponent,
            componentProps: {
              _assignmentId: assignmentId
            },
            cssClass: 'modal',
            backdropDismiss: false
          })).present()
        }
      ]
    };
    return options;
  }

  getSettingsActionSheetControllerOptions(assignmentId: string): ActionSheetOptions {
    const options = {
      cssClass: 'action-sheet',
      buttons: [
        {
          text: this._translateService.instant('assignments.tc-management-panel'),
          icon: 'cube-outline',
          handler: () => this._router.navigate([`assignments/form/${assignmentId}/tcs`])
        },
        {
          text: this._translateService.instant('assignments.show-event-logs'),
          icon: 'documents-outline',
          handler: () => { }
        },
        {
          text: this._translateService.instant('assignments.delete'),
          icon: 'trash-outline',
          handler: () => { }
        }
      ]
    };
    return options;
  }
}