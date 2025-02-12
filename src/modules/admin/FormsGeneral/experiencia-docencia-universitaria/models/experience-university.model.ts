export interface IResponseExperiencesUniversity {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : IExperienceUniversity[];
}

export interface IResponseExperienceUniversity {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : IExperienceUniversity;
}

export interface IExperienceUniversity {
  nLegDocCodigo               : number;
  cLegDocUniversidad          : string;
  cLegDocOtraInst             : string;
  cLegDocPais                 : string;
  nLegDocRegimen              : number;
  nValorRegimen               : number;
  nLegDocCategoria            : number;
  nValorCategoria             : number;
  dLegDocFechaInicio          : Date;
  dLegDocFechaFin             : Date;
  cFile                       : File;
  cLegDocArchivo              : string;
  nLegDocDatCodigo            : number;
  cLegDocValida               : boolean;
  cLegDocEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegDocUniversidadNavigation: ILegDocUniversidadNavigation;
  cUsuModificaNavigation      : string;
  cUsuRegistroNavigation      : string;
  vCategoria                  : VCategoria;
  nLegDocDatCodigoNavigation  : number;
  vRegimen                    : VCategoria;
}

export interface ILegDocUniversidadNavigation {
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

export interface VCategoria {
  nConCodigo     : number;
  nConValor      : number;
  cConDescripcion: string;
}

export interface IExperienceUniversityPost {
  nLegDocCodigo     ?: number;
  nLegDocRegimen     : number;
  nValorRegimen     ?: number;
  nLegDocCategoria   : number;
  nValorCategoria    : number;
  cLegDocUniversidad : string;
  cLegDocPais        : string;
  cLegDocOtraInst    : string;
  dLegDocFechaInicio?: string;
  dLegDocFechaFin   ?: string;
  cFile              : File | null | undefined;
  cLegGraArchivo    ?: string;
  cLegDocValida     ?: string;
  cLegDocEstado      : string;
}