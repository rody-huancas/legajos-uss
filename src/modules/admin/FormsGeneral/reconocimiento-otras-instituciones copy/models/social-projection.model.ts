export interface IBaseResponse<T> {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : T;
}

export type IResponseSocialProjections = IBaseResponse<ISocialProjection[]>;
export type IResponseSocialProjection  = IBaseResponse<ISocialProjection>;

export interface ISocialProjection {
  nLegProyCodigo               : number;
  cLegProyInstitucion          : string;
  cLegProyOtraInst             : string;
  cLegProyPais                 : string;
  nLegProyTipo                 : number;
  nValorTipo                   : number;
  cLegProyDescripcion          : string;
  dLegProyFechaInicio          : Date;
  dLegProyFechaFin             : Date;
  cFile                        : File;
  cLegProyArchivo              : string;
  nLegProyDatCodigo            : number;
  cLegProyValida               : boolean;
  cLegProyEstado               : boolean;
  cUsuRegistro                 : string;
  dFechaRegistro               : Date;
  cUsuModifica                 : string;
  dFechaModifica               : Date;
  cLegProyInstitucionNavigation: CLegProyInstitucionNavigation;
  cUsuModificaNavigation       : string;
  cUsuRegistroNavigation       : string;
  vTipo                        : VTipo;
  nLegProyDatCodigoNavigation  : number;
}

export interface CLegProyInstitucionNavigation {
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

export interface VTipo {
  nConCodigo     : number;
  nConValor      : number;
  cConDescripcion: string;
}

export interface ISocialProjectionPost {
  nLegProyCodigo     ?: number | undefined,
  cLegProyInstitucion : string,
  cLegProyPais        : string,
  cLegProyOtraInst    : string,
  cLegProyDescripcion : string,
  nLegProyTipo        : number,
  nValorTipo          : number,
  dLegProyFechaInicio : string,
  dLegProyFechaFin    : string,
  cFile               : File | null | undefined,
  cLegProyArchivo    ?: string,
  cLegProyValida      : string,
  cLegProyEstado      : string,
}
