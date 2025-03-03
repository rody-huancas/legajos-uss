import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";

export interface ResponseSuccess {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : null;
}

export interface IColumn<T> {
  key   ?: keyof T;
  header : string;
  render?: (row: T) => React.ReactNode;
  cell  ?: () => React.ReactNode;
}

export interface IGeneralProps {
  showModal      : boolean;
  onClose        : () => void;
  legGradoTitulo?: ILegGradoTitulo[];
  id            ?: number | null;
}
