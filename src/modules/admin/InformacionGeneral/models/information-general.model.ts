export interface IInterface {
  nIntCodigo     : number;
  nIntClase      : number;
  cIntJerarquia  : string;
  cIntNombre     : string;
  cIntDescripcion: string;
  nIntTipo       : number;
}

export interface IConstante {
  nConCodigo     : number;
  nConValor      : number;
  cConDescripcion: string;
}

export interface IBaseOptionGI {
  value: number;
  label: string;
}

export interface IBaseDataGI {
  nIntCodigo     ?: number;
  nConValor      ?: number;
  cIntDescripcion?: string;
  cConDescripcion?: string;
}

export type OptionsMappingGI = {
  nationalities   : IBaseDataGI[];
  departments     : IBaseDataGI[];
  academicDegree  : IBaseDataGI[];
  maritalStatus   : IBaseDataGI[];
  documentIdentity: IBaseDataGI[];
  sexo            : IBaseDataGI[];
  languages       : IBaseDataGI[];
  zoneTypes       : IBaseDataGI[];
  streetType      : IBaseDataGI[];
}