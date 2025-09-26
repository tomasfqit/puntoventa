import { IBrother } from "./IBrother";

export interface ITypesGroup {
  id: string;
  name: string;
}

export interface IGroup {
  id: string;
  name: string;
  type: ITypesGroup["id"];
  members: IBrother[];
}
