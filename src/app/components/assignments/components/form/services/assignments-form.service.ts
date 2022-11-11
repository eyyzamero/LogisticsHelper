import { Injectable } from '@angular/core';
import { ActionSheetOptions } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsFormService {

  constructor(
    private _translateService: TranslateService
  ) { }

  getAddActionSheetControllerOptions(): ActionSheetOptions {
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
          handler: () => { }
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