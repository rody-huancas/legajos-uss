export interface IBaseResponse<T> {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : T;
}

export type IResponseUniversitiesAdministrativeBurden = IBaseResponse<IUniversityAdministrativeBurden[]>;
export type IResponseUniversityAdministrativeBurden   = IBaseResponse<IUniversityAdministrativeBurden>;

export interface IUniversityAdministrativeBurden {
  nLegAdmCodigo               : number;
  nLegAdmCargo                : number;
  nClaseCargo                 : number;
  cLegAdmInstitucion          : string;
  cLegAdmOtraInst             : string;
  cLegAdmPais                 : string;
  cLegAdmDocumento            : string;
  dLegAdmFechaInicio          : Date;
  dLegAdmFechaFin             : Date;
  cFile                       : File;
  cLegAdmArchivo              : string;
  nLegAdmDatCodigo            : number;
  cLegAdmValida               : boolean;
  cLegAdmEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegAdmInstitucionNavigation: ICLegAdmInstitucionNavigation;
  cUsuModificaNavigation      : string;
  cUsuRegistroNavigation      : string;
  vCargo                      : VCargo;
  nLegAdmDatCodigoNavigation  : number;
}

export interface ICLegAdmInstitucionNavigation {
  cPerCodigo      : string;
  cPerApellido    : string;
  cPerApellPat    : string;
  cPerNombre      : string;
  dPerNacimiento  : Date;
  nPerTipo        : number;
  nPerEstado      : number;
  cUbigeoCodigo   : string;
  cperestadobiblio: string;
  nUbiGeoCodigo   : number;
}

export interface VCargo {
  nConCodigo     : number;
  nConValor      : number;
  cConDescripcion: string;
}

export interface IUniversityAdministrativeBurdenPost {
  nLegAdmCodigo     ?: number | undefined;
  cLegAdmInstitucion : string;
  cLegAdmPais        : string;
  cLegAdmOtraInst    : string;
  cLegAdmDocumento   : string;
  nLegAdmCargo       : number;
  nClaseCargo        : number;
  dLegAdmFechaInicio : string;
  dLegAdmFechaFin    : string;
  cFile             ?: File | null;
  cLegAdmArchivo    ?: string;
  cLegAdmValida      : string;
  cLegAdmEstado      : string;
}
