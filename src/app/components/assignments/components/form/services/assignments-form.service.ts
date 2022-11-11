import { Injectable } from '@angular/core';
import { ActionSheetOptions, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AssignmentsFormAddTcsModalComponent } from '../components/modals/add-tcs/assignments-form-add-tcs-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsFormService {

  constructor(
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
          handler: () => { }
        },
        {
          text: this._translateService.instant('assignments.add-tc'),
          icon: 'cube-outline',
          handler: async () => (await this._modalController.create({
            component: AssignmentsFormAddTcsModalComponent,
            cssClass: 'modal',
            componentProps: {
              assignmentId: assignmentId
            }
          })).present()
        }
      ]
    };
    return options;
  }

  getSettingsActionSheetControllerOptions(): ActionSheetOptions {
    const options = {
      cssClass: 'action-sheet',
      buttons: [
        {
          text: this._translateService.instant('assignments.tc-management-panel'),
          icon: 'cube-outline',
          handler: () => { }
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