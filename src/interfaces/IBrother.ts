import { IGroup } from "./IGroup";

export interface IBrother {
  id: string;
  name: string;
  email?: string;
  telefono?: string;
  direccion?: string;
}

export interface ICurrentBrother extends IBrother {
  group: IGroup;
}
