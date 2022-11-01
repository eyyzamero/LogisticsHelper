import { Injectable } from '@angular/core';
import { IAssignmentDbRefModel } from 'src/app/core/models';
import { AssignmentAccordionModel, AssignmentModel, IAssignmentAccordionModel, IAssignmentModel } from '../../models';

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

  private _IAssignmentDbRefModelToIAssignmentAccordionModel(src: IAssignmentDbRefModel): IAssignmentAccordionModel {
    const dest =  new AssignmentAccordionModel(this._IAssignmentDbRefModelToIAssignmentModel(src));
    return dest;
  }

  private _IAssignmentDbRefModelToIAssignmentModel(src: IAssignmentDbRefModel): IAssignmentModel {
    const dest = new AssignmentModel(src.id);
    return dest;
  }
}
