export interface IBaseResponse<T> {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : T;
}

export type IResponseNoTeachingProfesionalExperiences = IBaseResponse<INoTeachingProfesionalExperiences[]>;
export type IResponseNoTeachingProfesionalExperience  = IBaseResponse<INoTeachingProfesionalExperiences>;

export interface INoTeachingProfesionalExperiences {
  nLegProCodigo               : number;
  cLegProInstitucion          : string;
  cLegProOtraInst             : string;
  cLegProPais                 : string;
  nLegProCargo                : number;
  nValorCargo                 : number;
  cLegProCargoProf            : string;
  dLegProFechaInicio          : Date;
  dLegProFechaFin             : Date;
  cFile                       : File | undefined | null;
  cLegProArchivo              : string;
  nLegProDatCodigo            : number;
  cLegProValida               : boolean;
  cLegProEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : null;
  dFechaModifica              : null;
  cLegProInstitucionNavigation: CLegProInstitucionNavigation;
  cUsuModificaNavigation      : null;
  cUsuRegistroNavigation      : null;
  vCargo                      : VCargo;
  nLegProDatCodigoNavigation  : null;
}

export interface CLegProInstitucionNavigation {
  cPerCodigo      : string;
  cPerApellido    : string;
  cPerApellPat    : string;
  cPerNombre      : string;
  dPerNacimiento  : null;
  nPerTipo        : null;
  nPerEstado      : null;
  cUbigeoCodigo   : string;
  cperestadobiblio: string;
  nUbiGeoCodigo   : null;
}

export interface VCargo {
  nConCodigo     : number;
  nConValor      : number;
  cConDescripcion: string;
}

export interface INoTeachigProfessionalExperiencePost {
nLegProCodigo    ?: number | undefined,
cLegProInstitucion: string,
cLegProPais       : string,
cLegProOtraInst   : string
nLegProCargo      : number,
cLegProCargoProf  : string,
nValorCargo       : number,
dLegProFechaInicio: string,
dLegProFechaFin   : string,
cFile             : File | undefined | null,
cLegProArchivo   ?: string,
cLegProValida     : string,
cLegProEstado     : string,
}
