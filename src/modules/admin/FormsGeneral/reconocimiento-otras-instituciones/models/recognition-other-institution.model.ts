export interface IBaseResponse<T> {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : T;
}

export type IResponseRecognitionOtherInstitutions = IBaseResponse<IRecognitionOtherInstitutions[]>;
export type IResponseRecognitionOtherInstitution  = IBaseResponse<IRecognitionOtherInstitutions>;

export interface IRecognitionOtherInstitutions {
  nLegRecCodigo               : number;
  nLegRecDocumento            : number;
  nValorDocumento             : number;
  nLegRecTipo                 : number;
  nValorTipo                  : number;
  cLegRecInstitucion          : string;
  cLegRecOtraInst             : string;
  cLegRecPais                 : string;
  dLegRecFecha                : Date;
  cFile                       : File;
  cLegRecArchivo              : string;
  nLegRecDatCodigo            : number;
  cLegRecValida               : boolean;
  cLegRecEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegRecInstitucionNavigation: ICLegRecInstitucionNavigation;
  cUsuModificaNavigation      : string;
  cUsuRegistroNavigation      : string;
  vDocumento                  : IVDocumento;
  vTipo                       : IVDocumento;
  nLegRecDatCodigoNavigation  : number;
}

export interface ICLegRecInstitucionNavigation {
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

export interface IVDocumento {
  nConCodigo     : number;
  nConValor      : number;
  cConDescripcion: string;
}

export interface IRecognitionOtherInstitutionPost {
  nLegRecCodigo     ?: number | undefined,
  cLegRecInstitucion : string,
  cLegRecPais        : string,
  cLegRecOtraInst    : string,
  nLegRecDocumento   : number,
  nValorDocumento    : number,
  nLegRecTipo        : number,
  nValorTipo         : number,
  dLegRecFecha       : string,
  cFile             ?: File | undefined | null,
  cLegRecArchivo    ?: string,
  cLegRecValida      : string,
  cLegRecEstado      : string,
}