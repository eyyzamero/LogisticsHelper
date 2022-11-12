import { Injectable } from '@angular/core';
import { IAssignmentDbRefModel, IPalletDbRefModel, ITcDbRefModel } from 'src/app/core/models';
import { AssignmentModel, AssignmentPalletModel, AssignmentTcModel, IAssignmentModel, IAssignmentPalletModel, IAssignmentTcModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsMapperService {

  constructor() { }

  ArrayOfIAssignmentDbRefModelToArrayOfIAssignmentModel(src?: Array<IAssignmentDbRefModel>): Array<IAssignmentModel> {
    const dest = src?.map(this._IAssignmentDbRefModelToIAssignmentModel) ?? new Array<IAssignmentModel>();
    return dest;
  }

  ArrayOfITcDbRefToArrayOfIAssignmentTcModel(src?: Array<ITcDbRefModel>): Array<IAssignmentTcModel> {
    return src?.map(this.ITcDbRefModelToIAssignmentTcModel) ?? new Array<IAssignmentTcModel>();
  }

  ArrayOfIPalletDbRefToArrayOfIAssignmentPalletModel(src?: Array<IPalletDbRefModel>): Array<IAssignmentPalletModel> {
    return src?.map(this.IPalletDbRefModelToIAssignmentPalletModel) ?? new Array<IAssignmentPalletModel>();
  }

  ITcDbRefModelToIAssignmentTcModel(src: ITcDbRefModel): IAssignmentTcModel {
    const dest = new AssignmentTcModel(src.id, src.assignmentId, src.name, src.width, src.height, src.inners, src.limit);
    return dest;
  }

  IPalletDbRefModelToIAssignmentPalletModel(src: IPalletDbRefModel): IAssignmentPalletModel {
   const dest = new AssignmentPalletModel(src.id, src.assignmentId, src.tc, src.inners, src.full);
   return dest;
 }

  private _IAssignmentDbRefModelToIAssignmentModel(src: IAssignmentDbRefModel): IAssignmentModel {
    const dest = new AssignmentModel(src.id);
    return dest;
  }
}