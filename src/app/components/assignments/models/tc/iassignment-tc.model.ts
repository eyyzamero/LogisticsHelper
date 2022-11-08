import { IAssignmentPalletModel } from "../pallet/iassignment-pallet.model";

export interface IAssignmentTcModel {
  id: string;
  assignmentId: string;
  name: string;
  width: number;
  height: number;
  inners: number;
  limit: number;
  pallets: Array<IAssignmentPalletModel>;
}