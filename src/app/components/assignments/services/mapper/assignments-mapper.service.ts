import { Injectable } from '@angular/core';
import { IAssignmentDbRefModel, ITcDbRefModel } from 'src/app/core/models';
import { AssignmentAccordionModel, AssignmentModel, AssignmentTcModel, IAssignmentAccordionModel, IAssignmentModel, IAssignmentTcModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsMapperService {

  constructor() { }

  ArrayOfIAssignmentDbRefModelToArrayOfIAssignmentAccordionModel(src: Array<IAssignmentDbRefModel>): Array<IAssignmentAccordionModel> {
    const dest = new Array<IAssignmentAccordionModel>();
    
    src.forEach(x => {
      const assignment = this._IAssignmentDbRefModelToIAssignmentAccordionModel(x);
      dest.push(assignment);
    });
    return dest;
  }

  ArrayOfITcDbRefToArrayOfIAssignmentTcModel(src: Array<ITcDbRefModel>): Array<IAssignmentTcModel> {
    return src.map(this._ITcDbRefModelToIAssignmentTcModel);
  }

  private _IAssignmentDbRefModelToIAssignmentAccordionModel(src: IAssignmentDbRefModel): IAssignmentAccordionModel {
    const dest =  new AssignmentAccordionModel(this._IAssignmentDbRefModelToIAssignmentModel(src));
    return dest;
  }

  private _IAssignmentDbRefModelToIAssignmentModel(src: IAssignmentDbRefModel): IAssignmentModel {
    const dest = new AssignmentModel(src.id);
    return dest;
  }

  private _ITcDbRefModelToIAssignmentTcModel(src: ITcDbRefModel): IAssignmentTcModel {
    const dest = new AssignmentTcModel(src.id, src.name, src.width, src.height, src.inners, src.limit);
    return dest;
  }
}