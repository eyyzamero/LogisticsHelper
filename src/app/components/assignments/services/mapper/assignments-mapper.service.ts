import { Injectable } from '@angular/core';
import { IAssignmentDbRefModel, IAssignmentLogDbRefModel, IPalletDbRefModel, ITcDbRefModel } from 'src/app/core/models';
import { AssignmentLogModel, AssignmentModel, AssignmentPalletModel, AssignmentTcModel, IAssignmentLogModel, IAssignmentModel, IAssignmentPalletModel, IAssignmentTcModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsMapperService {

  constructor() { }

  ArrayOfIAssignmentDbRefModelToArrayOfIAssignmentModel(src?: Array<IAssignmentDbRefModel>): Array<IAssignmentModel> {
    const dest = src?.map(this.IAssignmentDbRefModelToIAssignmentModel) ?? new Array<IAssignmentModel>();
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
   const dest = new AssignmentPalletModel(src.id, src.assignmentId, src.tcId, src.inners, src.full);
   return dest;
 }

  IAssignmentDbRefModelToIAssignmentModel(src: IAssignmentDbRefModel): IAssignmentModel {
    const dest = new AssignmentModel(src.id, src.status);
    return dest;
  }

  ArrayOfIAssignmentLogDbRefModelToArrayOfIAssignmentLogModel(src?: Array<IAssignmentLogDbRefModel>): Array<IAssignmentLogModel> {
    const dest = src?.sort((a, b) => a.timestamp - b.timestamp).map(x => this.IAssignmentLogDbRefModelToIAssignmentLogModel(x)) ?? new Array<IAssignmentLogModel>();
    return dest;
  }

  IAssignmentLogDbRefModelToIAssignmentLogModel(src: IAssignmentLogDbRefModel): IAssignmentLogModel {
    const dest = new AssignmentLogModel(src.id, src.assignmentId, src.type, src.text, src.second_text, this.TimestampToFormattedDateString(src.timestamp));
    return dest;
  }

  TimestampToFormattedDateString(src: number): string {
    const date = new Date(src);
    const day = String(date.getDate()).padStart(2, '0');
    const month = Number(String(date.getMonth()).padStart(2, '0')) + 1;
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } 
}