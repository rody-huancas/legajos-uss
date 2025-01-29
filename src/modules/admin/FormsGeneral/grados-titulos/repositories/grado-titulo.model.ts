export interface IGradoTitulo {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : IDataGradoTitulo[];
}

export interface IDataGradoTitulo {
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
  cFile                       : string;
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
