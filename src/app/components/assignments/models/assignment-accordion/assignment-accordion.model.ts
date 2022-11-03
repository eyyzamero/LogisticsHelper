import { AssignmentModel, IAssignmentAccordionModel, IAssignmentModel } from "..";

export class AssignmentAccordionModel implements IAssignmentAccordionModel {

  constructor(
    public data: IAssignmentModel = new AssignmentModel(),
    public opened: boolean = false
  ) { }
}