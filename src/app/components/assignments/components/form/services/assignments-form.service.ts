import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ActionSheetOptions, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FirestoreCollection } from 'src/app/core/enums';
import { IAssignmentDbRefModel } from 'src/app/core/models';
import { FirestoreCollectionService } from 'src/app/core/services/collections/firestore-collection.service';
import { AssignmentsObservableService } from '../../../services/observable/assignments-observable.service';
import { AssignmentsFormAddPalletModalComponent } from '../components/modals/add-pallet/assignments-form-add-pallet-modal.component';
import { AssignmentsFormTcModalComponent } from '../components/modals/add-tcs/assignments-form-tc-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsFormService {

  private _assignmentsCollectionService: FirestoreCollectionService<IAssignmentDbRefModel>;

  constructor(
    firestore: AngularFirestore,
    private _router: Router,
    private _translateService: TranslateService,
    private _modalController: ModalController,
    private _assignmentsObservableService: AssignmentsObservableService
  ) {
    this._assignmentsCollectionService = new FirestoreCollectionService<IAssignmentDbRefModel>(firestore, FirestoreCollection.ASSIGNMENTS);
  }

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
              title: this._translateService.instant('assignments.add-tc'),
              assignmentId: assignmentId
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
          handler: () => this._router.navigate([`assignments/form/${assignmentId}/logs`])
        },
        {
          text: this._translateService.instant('assignments.delete'),
          icon: 'trash-outline',
          handler: () => this._assignmentsCollectionService.delete(assignmentId).then(
            () => {
              this._assignmentsObservableService.delete(assignmentId);
              this._router.navigate(['assignments']);
            }
          )
        }
      ]
    };
    return options;
  }
}