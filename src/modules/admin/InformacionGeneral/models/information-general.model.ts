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

export interface IPersona {
  cPerCodigo       : string;
  cPerApellido?    : string;
  cPerApellPat?    : string;
  cPerNombre       : string;
  dPerNacimiento?  : Date | null;
  nPerTipo?        : number | null;
  nPerEstado?      : number | null;
  cUbigeoCodigo?   : string;
  cperestadobiblio?: string;
  nUbiGeoCodigo?   : number | null;
}
export interface IBaseOptionGI {
  value: number | string;
  label: string;
}

export interface IBaseDataGI {
  nIntCodigo     ?: number;
  nConValor      ?: number;
  cPerCodigo     ?: string;

  cIntDescripcion?: string;
  cConDescripcion?: string;
  cPerNombre     ?: string;
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