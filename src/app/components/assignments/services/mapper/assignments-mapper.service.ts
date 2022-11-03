import { Injectable } from '@angular/core';
import { IAssignmentDbRefModel, ITcDbRefModel } from 'src/app/core/models';
import { AssignmentModel, AssignmentTcModel, IAssignmentModel, IAssignmentTcModel } from '../../models';

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
    return src?.map(this._ITcDbRefModelToIAssignmentTcModel) ?? new Array<IAssignmentTcModel>();
  }

  private _IAssignmentDbRefModelToIAssignmentModel(src: IAssignmentDbRefModel): IAssignmentModel {
    const dest = new AssignmentModel(src.id);
    return dest;
  }

  private _ITcDbRefModelToIAssignmentTcModel(src: ITcDbRefModel): IAssignmentTcModel {
    const dest = new AssignmentTcModel(src.id, src.assignmentId, src.name, src.width, src.height, src.inners, src.limit);
    return dest;
  }
}