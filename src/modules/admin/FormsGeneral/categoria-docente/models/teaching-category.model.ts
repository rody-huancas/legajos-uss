export interface ITeachingCategoriesResp {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : ITeachingCategory[];
}

export interface ITeachingCategoryResp {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : ITeachingCategory;
}

export interface ITeachingCategory {
  nLegCatCodigo               : number;
  cLegCatInstitucion          : string;
  cLegCatOtraInst             : string;
  cLegCatPais                 : string;
  nLegCatCategoria            : number;
  nValorCategoria             : number;
  dLegCatFechaInicio          : string;
  dLegCatFechaFin             : string;
  cFile                       : File;
  cLegCatArchivo              : string;
  nLegCatDatCodigo            : number;
  cLegCatValida               : boolean;
  cLegCatEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegCatInstitucionNavigation: CLegCatInstitucionNavigation;
  cUsuModificaNavigation      : string;
  cUsuRegistroNavigation      : string;
  vCategoria                  : VCategoria;
  nLegCatDatCodigoNavigation  : number;
}

export interface CLegCatInstitucionNavigation {
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

export interface VCategoria {
  nConCodigo     : number;
  nConValor      : number;
  cConDescripcion: string;
}

export interface ITeachingCategoryPost {
  nLegCatCodigo     ?: number;
  cLegCatInstitucion : string;
  cLegCatPais        : string;
  cLegCatOtraInst   ?: string;
  nLegCatCategoria   : number;
  nValorCategoria    : number;
  dLegCatFechaInicio : string;
  dLegCatFechaFin    : string;
  cFile              : File | null | undefined;
  cLegGraArchivo    ?: string;
  cLegCatValida      : boolean;
  cLegCatEstado      : boolean;
}
