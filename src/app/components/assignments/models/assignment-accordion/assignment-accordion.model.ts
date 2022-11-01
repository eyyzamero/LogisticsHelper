import { AssignmentModel, IAssignmentAccordionModel, IAssignmentModel } from "..";

export class AssignmentAccordionModel implements IAssignmentAccordionModel {

  constructor(
    public assignment: IAssignmentModel = new AssignmentModel(),
    public opened: boolean = false
  ) { }
}