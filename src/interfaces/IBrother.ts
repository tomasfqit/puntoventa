import { IGroup } from "./IGroup";

export interface IBrother {
  id: string;
  name: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  isHead?: boolean;
}

export interface ICurrentBrother extends IBrother {
  group: IGroup;
}
