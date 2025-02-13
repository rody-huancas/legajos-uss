export interface IBaseResponse<T> {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : T;
}

export type IResponseTeachingDedicactionsRegime = IBaseResponse<ITeachingDedicactionsRegime[]>;
export type IResponseTeachingDedicactionRegime  = IBaseResponse<ITeachingDedicactionsRegime>;

export interface ITeachingDedicactionsRegime {
  nLegRegCodigo                : number;
  cLegCatInstitucion           : string;
  cLegRegOtraInst              : string;
  cLegRegPais                  : string;
  nLegRegDedicacion            : number;
  nValorDedicacion             : number;
  dLegRegFechaInicio           : Date;
  dLegRegFechaFin              : Date;
  cFile                        : string;
  cLegRegArchivo               : string;
  nLegRegDatCodigo             : number;
  cLegRegValida                : boolean;
  cLegRegEstado                : boolean;
  cUsuRegistro                 : string;
  dFechaRegistro               : Date;
  cUsuModifica                 : string;
  dFechaModifica               : Date;
  vDedicacion                  : VDedicacion;
  cLegCatInstitucionNavigation : ILegCatInstitucionNavigation;
  cUsuModificaNavigation      ?: string;
  cUsuRegistroNavigation      ?: string;
  nLegRegDatCodigoNavigation  ?: number;
}

export interface ILegCatInstitucionNavigation {
  cPerApellPat    : string,
  cPerApellido    : string,
  cPerCodigo      : string,
  cPerNombre      : string,
  cUbigeoCodigo   : string,
  cperestadobiblio: string,
  dPerNacimiento  : Date,
  nPerEstado      : number,
  nPerTipo        : number,
  nUbiGeoCodigo   : number
}  

export interface ITeachingDedicactionsRegimePost {
  nLegRegCodigo     ?: number;
  cLegCatInstitucion : string;
  cLegRegPais        : string;
  cLegRegOtraInst    : string;
  nLegRegDedicacion  : number;
  nValorDedicacion   : number;
  dLegRegFechaInicio : string;
  dLegRegFechaFin    : string;
  cFile             ?: File | null| undefined;
  cLegRegArchivo    ?: string;
  cLegRegValida      : string;
  cLegRegEstado      : string;
}

export interface VDedicacion {
  nConCodigo     : number;
  nConValor      : number;
  cConDescripcion: string;
}
