export interface IResponseDegreesTitle {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : IDataDegreesTitle[];
}

export interface IResponseDegreeTitle {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : IDataDegreesTitle;
}

export interface IDataDegreesTitle {
  nLegGraCodigo               : number;
  nLegGraGradoAcad            : number;
  nClaseGradoAcad             : number;
  cLegGraInstitucion          : string;
  cLegGraOtraInst             : string;
  cLegGraCarreraProf          : string;
  nLegGraPais                 : number;
  nClasePais                  : number;
  nLegGraUbigeo               : number;
  nClaseUbigeo                : number;
  dLegGraFecha                : Date;
  cFile                       : File;
  cLegGraArchivo              : string;
  nLegGraDatCodigo            : number;
  cLegGraValida               : boolean;
  cLegGraEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegGraInstitucionNavigation: CLegGraInstitucionNavigation;
  cUsuModificaNavigation      : string;
  cUsuRegistroNavigation      : string;
  vGradoAcad                  : VGradoAcad;
  nLegGraDatCodigoNavigation  : number;
  vPais                       : VGradoAcad;
}

export interface CLegGraInstitucionNavigation {
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

export interface VGradoAcad {
  nIntCodigo     : number;
  nIntClase      : number;
  cIntJerarquia  : string;
  cIntNombre     : string;
  cIntDescripcion: string;
  nIntTipo       : number;
}

// Para mandar a registrar
export interface IRegisterDegreesTitle {
  NLegGraCodigo    ?: number | undefined;
  NLegGraGradoAcad  : number;
  NClaseGradoAcad   : number;
  CLegGraCarreraProf: string;
  CLegGraInstitucion: string;
  CLegGraOtraInst   : string;
  NLegGraPais       : number;
  NClasePais        : number;
  DLegGraFecha      : string;
  cFile             : File | null;
  CLegGraValida     : boolean;
  CLegGraEstado     : boolean;
}