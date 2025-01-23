export interface ILegDatosGenerales {
  nLegDatCodigo               : number;
  nLegDatTipoDoc              : number;
  nClaseTipoDoc               : number;
  cLegDatNroDoc               : string;
  cLegDatApellidoPaterno      : string;
  cLegDatApellidoMaterno      : string;
  cLegDatNombres              : string;
  dLegDatFechaNacimiento      : Date;
  nLegDatSexo                 : number;
  nClaseSexo                  : number;
  nLegDatEstadoCivil          : number;
  nClaseEstadoCivil           : number;
  string                       : string;
  cLegDatFoto                 : string;
  stringFirma                  : string;
  cLegDatFirma                : string;
  stringSunedu                 : string;
  cLegDatSunedu               : string;
  stringPolicial               : string;
  cLegDatPolicial             : string;
  stringJudicial               : string;
  stringBuenaSalud             : string;
  declaracionjuradaflag       : boolean;
  fechadeclaracionjurada      : Date;
  nLegIdiomaNativo            : number;
  cLegDatBuenaSalud           : string;
  cLegDatJudicial             : string;
  cLegDatEmail                : string;
  cLegDatTelefono             : string;
  cLegDatMovil                : string;
  nLegDatGradoAcad            : number;
  nClaseGradoAcad             : number;
  nLegDatPais                 : number;
  nClasePais                  : number;
  cLegDatAcerca               : string;
  nLegDatZona                 : number;
  nValorZona                  : number;
  nLegDatTipoDomicilio        : number;
  nValorTipoDomicilio         : number;
  cLegDatCalleDomicilio       : string;
  cLegDatNroDomicilio         : string;
  cLegDatMzaDomicilio         : string;
  cLegDatLtDomicilio          : string;
  cLegDatDptoDomicilio        : string;
  cLegDatReferencia           : string;
  nLetDatUbigeo               : number;
  nClaseUbigeo                : number;
  nLetDatNacimiento           : number;
  nClaseNacimiento            : number;
  cLegDatColegioProf          : string;
  cLegDatNroColegiatura       : string;
  nLegDatCondicionColeg       : number;
  nValorCondicionColeg        : number;
  dLegDatosFechaEmisionColeg  : Date;
  dLegDatosFechaExpiraColeg   : Date;
  cLegDatEstado               : boolean;
  cPerCodigo                  : string;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegDatColegioProfNavigation: Ion;
  cUsuModificaNavigation      : CUsuNavigation;
  cUsuRegistroNavigation      : CUsuNavigation;
  vCondicionColeg             : VCondicionColeg;
  vPais                       : VGradoAcad;
  vSexo                       : VCondicionColeg;
  vEstadoCivil                : VCondicionColeg;
  vTipoDoc                    : VGradoAcad;
  vTipoDomicilio              : VCondicionColeg;
  vZona                       : VCondicionColeg;
  vNacimiento                 : VGradoAcad;
  vGradoAcad                  : VGradoAcad;
  vIdiomaNativo               : VCondicionColeg;
  legAdminitrativaCarga       : LegAdminitrativaCarga[];
  legCapacitacionInternas     : LegCapacitacionInterna[];
  legContratos                : LegContrato[];
  legCapacitaciones           : LegCapacitacione[];
  legCategoriaDocente         : LegCategoriaDocente[];
  legDocenciaUniv             : LegDocenciaUniv[];
  legGradoTitulo              : LegGradoTitulo[];
  legIdiomaOfimatica          : LegIdiomaOfimatica[];
  legInvestigador             : LegInvestigador[];
  legParticipacionCongSem     : LegParticipacionCongSem[];
  legProduccionCiencia        : LegProduccionCiencia[];
  legProfesNoDocente          : LegProfesNoDocente[];
  legProyeccionSocial         : LegProyeccionSocial[];
  legReconocimiento           : LegReconocimiento[];
  legRegimenDedicacion        : LegRegimenDedicacion[];
  legTesisAseJur              : LegTesisAseJur[];
  legResoluciones             : LegResolucione[];
  legEvaluacionDesemp         : LegEvaluacionDesemp[];
  legSeleccion                : LegSeleccion[];
  legOrdinarizacion           : LegOrdinarizacion[];
  legDeclaracionJurada        : LegDeclaracionJurada[];
  legDocumentacionInterna     : LegDocumentacionInterna[];
}

export interface Ion {
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

export interface CUsuNavigation {
  cPerCodigo   : string;
  cPerUsuCodigo: string;
  cPerUsuClave : string;
  cPerUsuEstado: number;
  cPerJuridica : string;
  cPudFecha    : Date;
  nPerRelacion : string;
}

export interface LegAdminitrativaCarga {
  nLegAdmCodigo               : number;
  nLegAdmCargo                : number;
  nClaseCargo                 : number;
  cLegAdmInstitucion          : string;
  cLegAdmOtraInst             : string;
  cLegAdmPais                 : string;
  cLegAdmDocumento            : string;
  dLegAdmFechaInicio          : Date;
  dLegAdmFechaFin             : Date;
  string                       : string;
  cLegAdmArchivo              : string;
  nLegAdmDatCodigo            : number;
  cLegAdmValida               : boolean;
  cLegAdmEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegAdmInstitucionNavigation: Ion;
  cUsuModificaNavigation      : CUsuNavigation;
  cUsuRegistroNavigation      : CUsuNavigation;
  vCargo                      : VCondicionColeg;
}

export interface VCondicionColeg {
  nConCodigo     : number;
  nConValor      : number;
  cConDescripcion: string;
}

export interface LegCapacitacionInterna {
  nLegCicodigo           : number;
  cLegCicompetenciaMejora: string;
  nCapCodigo             : number;
  nLegDatCodigo          : number;
  string                  : string;
  cLegCiarchivo          : string;
  bLegCiestado           : boolean;
  cUsuRegistro           : string;
  dFechaRegistro         : Date;
  cUsuModifica           : string;
  dFechaModifica         : Date;
  vCapacitacionUSS       : VCapacitacionUSS;
}

export interface VCapacitacionUSS {
  nCapCodigo             : number;
  cCapTema               : string;
  dCapFechaInicio        : Date;
  dCapFechaFin           : Date;
  nCapHoras              : number;
  bCapEstado             : boolean;
  cUsuRegistro           : string;
  dFechaRegistro         : Date;
  cUsuModifica           : string;
  dFechaModifica         : Date;
  legCapacitacionInternas: null[];
}

export interface LegCapacitacione {
  nLegCapCodigo         : number;
  cLegCapNombre         : string;
  nLegCapTipo           : number;
  nLegCapTipoEsp        : number;
  nLegCapHoras          : number;
  dLegCapFechaInicio    : Date;
  dLegCapFechaFin       : Date;
  string                 : string;
  cLegCapArchivo        : string;
  cLegCapInstitucion    : string;
  cLegCapOtraInst       : string;
  cLegCapPais           : string;
  nLegCapDatCodigo      : number;
  cLegCapValida         : boolean;
  cLegCapEstado         : boolean;
  nValorTipo            : number;
  nValorTipoEsp         : number;
  cUsuRegistro          : string;
  dFechaRegistro        : Date;
  cUsuModifica          : string;
  dFechaModifica        : Date;
  cUsuModificaNavigation: CUsuNavigation;
  cUsuRegistroNavigation: CUsuNavigation;
  vTipo                 : VCondicionColeg;
  vInstitucion          : Ion;
  vTipoEsp              : VCondicionColeg;
}

export interface LegCategoriaDocente {
  nLegCatCodigo               : number;
  cLegCatInstitucion          : string;
  cLegCatOtraInst             : string;
  cLegCatPais                 : string;
  nLegCatCategoria            : number;
  nValorCategoria             : number;
  dLegCatFechaInicio          : Date;
  dLegCatFechaFin             : Date;
  string                       : string;
  cLegCatArchivo              : string;
  nLegCatDatCodigo            : number;
  cLegCatValida               : boolean;
  cLegCatEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegCatInstitucionNavigation: Ion;
  cUsuModificaNavigation      : CUsuNavigation;
  cUsuRegistroNavigation      : CUsuNavigation;
  vCategoria                  : VCondicionColeg;
}

export interface LegContrato {
  nLegConCodigo     : number;
  nLegConCargo      : number;
  nLegValCargo      : number;
  nLegConArea       : number;
  nLegValArea       : number;
  dLegConFechaInicio: Date;
  dLegConFechaFin   : Date;
  nLegConSueldo     : number;
  cLegConArchivo    : string;
  string             : string;
  bLegConEstado     : boolean;
  nLegConDatCodigo  : number;
  cUsuRegistro      : string;
  dFechaRegistro    : Date;
  cUsuModifica      : string;
  dFechaModifica    : Date;
  vArea             : VGradoAcad;
  vCargo            : VGradoAcad;
}

export interface VGradoAcad {
  nIntCodigo     : number;
  nIntClase      : number;
  cIntJerarquia  : string;
  cIntNombre     : string;
  cIntDescripcion: string;
  nIntTipo       : number;
}

export interface LegDeclaracionJurada {
  nLegDjcodigo   : number;
  dLegDjfecha    : Date;
  cLegDjanexo2   : string;
  stringDjanexo2  : string;
  cLegDjanexo6   : string;
  stringDjanexo6  : string;
  cLegDjanexo7   : string;
  stringDjanexo7  : string;
  bLegDjestado   : boolean;
  nLegDjdatCodigo: number;
  cUsuRegistro   : string;
  dFechaRegistro : Date;
  cUsuModifica   : string;
  dFechaModifica : Date;
}

export interface LegDocenciaUniv {
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
  string                       : string;
  cLegDocArchivo              : string;
  nLegDocDatCodigo            : number;
  cLegDocValida               : boolean;
  cLegDocEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegDocUniversidadNavigation: Ion;
  cUsuModificaNavigation      : CUsuNavigation;
  cUsuRegistroNavigation      : CUsuNavigation;
  vCategoria                  : VCondicionColeg;
  vRegimen                    : VCondicionColeg;
}

export interface LegDocumentacionInterna {
  nLegDicodigo     : number;
  cLegDiarchivo    : string;
  string            : string;
  nLegDitipoDoc    : number;
  nLegValTipoDoc   : number;
  cLegDicodigo     : string;
  cLegDidescripcion: string;
  bLegDiestado     : boolean;
  nLegDidatCodigo  : number;
  cUsuRegistro     : string;
  dFechaRegistro   : Date;
  cUsuModifica     : string;
  dFechaModifica   : Date;
  vTipo            : VCondicionColeg;
}

export interface LegEvaluacionDesemp {
  nLegEvalCodigo   : number;
  nLegEvalCargo    : number;
  nLegValCargo     : number;
  nLegEvalArea     : number;
  nLegValArea      : number;
  cLegEvalSemestre : string;
  cLegEvalAnio     : string;
  nLegEvalPuntaje  : number;
  nLegEvalNivel    : number;
  nLegValNivel     : number;
  cLegEvalArchivo  : string;
  string            : string;
  bLegEvalEstado   : boolean;
  nLegEvalDatCodigo: number;
  cUsuRegistro     : string;
  dFechaRegistro   : Date;
  cUsuModifica     : string;
  dFechaModifica   : Date;
  vArea            : VGradoAcad;
  vCargo           : VGradoAcad;
  vNivel           : VCondicionColeg;
}

export interface LegGradoTitulo {
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
  string                       : string;
  cLegGraArchivo              : string;
  nLegGraDatCodigo            : number;
  cLegGraValida               : boolean;
  cLegGraEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegGraInstitucionNavigation: Ion;
  cUsuModificaNavigation      : CUsuNavigation;
  cUsuRegistroNavigation      : CUsuNavigation;
  vGradoAcad                  : VGradoAcad;
  vPais                       : VGradoAcad;
}

export interface LegIdiomaOfimatica {
  nLegIdOfCodigo        : number;
  nLegIdOfCodigoDesc    : number;
  nValorDesc            : number;
  cLegIdOfTipo          : boolean;
  nLegIdOfNivel         : number;
  nValorNivel           : number;
  dLegIdOfFecha         : Date;
  string                 : string;
  cLegIdOfArchivo       : string;
  nLegIdOfDatCodigo     : number;
  cLegIdOfValida        : boolean;
  cLegIdOfEstado        : boolean;
  cUsuRegistro          : string;
  dFechaRegistro        : Date;
  cUsuModifica          : string;
  dFechaModifica        : Date;
  cUsuModificaNavigation: CUsuNavigation;
  cUsuRegistroNavigation: CUsuNavigation;
  vCodigoDesc           : VCondicionColeg;
  vNivel                : VCondicionColeg;
}

export interface LegInvestigador {
  nLegInvCodigo         : number;
  nLegInvCentroRegistro : number;
  nValorCentroRegistro  : number;
  cLegInvNroRegistro    : string;
  dLegInvFechaInicio    : Date;
  dLegInvFechaFin       : Date;
  string                 : string;
  cLegInvArchivo        : string;
  nLegInvDatCodigo      : number;
  cLegInvValida         : boolean;
  cLegInvEstado         : boolean;
  cUsuRegistro          : string;
  dFechaRegistro        : Date;
  cUsuModifica          : string;
  dFechaModifica        : Date;
  cUsuModificaNavigation: CUsuNavigation;
  cUsuRegistroNavigation: CUsuNavigation;
  vCentroRegistro       : VGradoAcad;
}

export interface LegOrdinarizacion {
  nLegOrdCodigo          : number;
  nLegOrdCargo           : number;
  nLegValCargo           : number;
  nLegOrdArea            : number;
  nLegOrdValArea         : number;
  dLegOrdFecha           : Date;
  cLegOrdFichaInscripcion: string;
  stringFichaInscripcion  : string;
  cLegOrdEvaluacionCv    : string;
  stringEvaluacionCv      : string;
  cLegOrdClaseModelo     : string;
  stringClaseModelo       : string;
  cLegOrdEvaluacionPsico : string;
  stringEvaluacionPsico   : string;
  cLegOrdEntrevistaPers  : string;
  stringEntrevistaPers    : string;
  bLegOrdEstado          : boolean;
  nLegOrdDatCodigo       : number;
  cUsuRegistro           : string;
  dFechaRegistro         : Date;
  cUsuModifica           : string;
  dFechaModifica         : Date;
  vArea                  : VGradoAcad;
  vCargo                 : VGradoAcad;
}

export interface LegParticipacionCongSem {
  nLegParCodigo               : number;
  cLegParInstitucion          : string;
  cLegParOtraInst             : string;
  cLegParPais                 : string;
  nLegParRol                  : number;
  nValorRol                   : number;
  nLegParAmbito               : number;
  nValorAmbito                : number;
  cLegParNombre               : string;
  dLegParFecha                : Date;
  dLegParFechaFin             : Date;
  nLegParHoras                : number;
  cLegParArchivoOrig          : string;
  string                       : string;
  cLegParArchivo              : string;
  nLegParDatCodigo            : number;
  cLegParValida               : boolean;
  cLegParEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegParInstitucionNavigation: Ion;
  cUsuModificaNavigation      : CUsuNavigation;
  cUsuRegistroNavigation      : CUsuNavigation;
  vAmbito                     : VGradoAcad;
  vRol                        : VGradoAcad;
  strings                      : string[];
  cPerCodigo                  : string;
}

export interface LegProduccionCiencia {
  nLegProdCodigo        : number;
  nLegProdTipo          : number;
  nValorTipo            : number;
  cLegProdTitulo        : string;
  dLegProdFecha         : Date;
  cLegProdNroResolucion : string;
  string                 : string;
  cLegProdArchivo       : string;
  nLegProdDatCodigo     : number;
  cLegProdValida        : boolean;
  cLegProdEstado        : boolean;
  cUsuRegistro          : string;
  dFechaRegistro        : Date;
  cUsuModifica          : string;
  dFechaModifica        : Date;
  cUsuModificaNavigation: CUsuNavigation;
  cUsuRegistroNavigation: CUsuNavigation;
  vTipo                 : VGradoAcad;
}

export interface LegProfesNoDocente {
  nLegProCodigo               : number;
  cLegProInstitucion          : string;
  cLegProOtraInst             : string;
  cLegProPais                 : string;
  nLegProCargo                : number;
  nValorCargo                 : number;
  cLegProCargoProf            : string;
  dLegProFechaInicio          : Date;
  dLegProFechaFin             : Date;
  string                       : string;
  cLegProArchivo              : string;
  nLegProDatCodigo            : number;
  cLegProValida               : boolean;
  cLegProEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegProInstitucionNavigation: Ion;
  cUsuModificaNavigation      : CUsuNavigation;
  cUsuRegistroNavigation      : CUsuNavigation;
  vCargo                      : VCondicionColeg;
}

export interface LegProyeccionSocial {
  nLegProyCodigo               : number;
  cLegProyInstitucion          : string;
  cLegProyOtraInst             : string;
  cLegProyPais                 : string;
  nLegProyTipo                 : number;
  nValorTipo                   : number;
  cLegProyDescripcion          : string;
  dLegProyFechaInicio          : Date;
  dLegProyFechaFin             : Date;
  string                        : string;
  cLegProyArchivo              : string;
  nLegProyDatCodigo            : number;
  cLegProyValida               : boolean;
  cLegProyEstado               : boolean;
  cUsuRegistro                 : string;
  dFechaRegistro               : Date;
  cUsuModifica                 : string;
  dFechaModifica               : Date;
  cLegProyInstitucionNavigation: Ion;
  cUsuModificaNavigation       : CUsuNavigation;
  cUsuRegistroNavigation       : CUsuNavigation;
  vTipo                        : VCondicionColeg;
}

export interface LegReconocimiento {
  nLegRecCodigo               : number;
  nLegRecDocumento            : number;
  nValorDocumento             : number;
  nLegRecTipo                 : number;
  nValorTipo                  : number;
  cLegRecInstitucion          : string;
  cLegRecOtraInst             : string;
  cLegRecPais                 : string;
  dLegRecFecha                : Date;
  string                       : string;
  cLegRecArchivo              : string;
  nLegRecDatCodigo            : number;
  cLegRecValida               : boolean;
  cLegRecEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegRecInstitucionNavigation: Ion;
  cUsuModificaNavigation      : CUsuNavigation;
  cUsuRegistroNavigation      : CUsuNavigation;
  vDocumento                  : VCondicionColeg;
  vTipo                       : VCondicionColeg;
}

export interface LegRegimenDedicacion {
  nLegRegCodigo               : number;
  cLegCatInstitucion          : string;
  cLegRegOtraInst             : string;
  cLegRegPais                 : string;
  nLegRegDedicacion           : number;
  nValorDedicacion            : number;
  dLegRegFechaInicio          : Date;
  dLegRegFechaFin             : Date;
  string                       : string;
  cLegRegArchivo              : string;
  nLegRegDatCodigo            : number;
  cLegRegValida               : boolean;
  cLegRegEstado               : boolean;
  cUsuRegistro                : string;
  dFechaRegistro              : Date;
  cUsuModifica                : string;
  dFechaModifica              : Date;
  cLegCatInstitucionNavigation: Ion;
  cUsuModificaNavigation      : CUsuNavigation;
  cUsuRegistroNavigation      : CUsuNavigation;
  vDedicacion                 : VCondicionColeg;
}

export interface LegResolucione {
  nLegResCodigo       : number;
  nLegResTipo         : number;
  nLegValTipo         : number;
  dLegResFecha        : Date;
  cLegResResuelve     : string;
  cLegResNroResolucion: string;
  cLegResArchivo      : string;
  string               : string;
  bLegResEstado       : boolean;
  nLegResDatCodigo    : number;
  cUsuRegistro        : string;
  dFechaRegistro      : Date;
  cUsuModifica        : string;
  dFechaModifica      : Date;
  vResolucion         : VCondicionColeg;
}

export interface LegSeleccion {
  nLegSelCodigo         : number;
  nLegSelCargo          : number;
  nLegValCargo          : number;
  nLegSelArea           : number;
  nLegValArea           : number;
  dLegSelFecha          : Date;
  cLegSelEvaluacionCv   : string;
  stringEvaluacionCv     : string;
  cLegSelClaseModelo    : string;
  stringClaseModelo      : string;
  cLegSelEvaluacionPsico: string;
  stringEvaluacionPsico  : string;
  cLegSelEntrevistaPers : string;
  stringEntrevistaPers   : string;
  bLegSelEstado         : boolean;
  nLegSelDatCodigo      : number;
  cUsuRegistro          : string;
  dFechaRegistro        : Date;
  cUsuModifica          : string;
  dFechaModifica        : Date;
  vArea                 : VGradoAcad;
  vCargo                : VGradoAcad;
}

export interface LegTesisAseJur {
  nLegTesCodigo         : number;
  nLegTesTipo           : number;
  nValorTipo            : number;
  nLegTesNivel          : number;
  nValorNivel           : number;
  dLegTesFecha          : Date;
  cLegTesNroResolucion  : string;
  string                 : string;
  cLegTesArchivo        : string;
  nLegTesDatCodigo      : number;
  cLegTesValida         : boolean;
  cLegTesEstado         : boolean;
  cUsuRegistro          : string;
  dFechaRegistro        : Date;
  cUsuModifica          : string;
  dFechaModifica        : Date;
  cUsuModificaNavigation: CUsuNavigation;
  cUsuRegistroNavigation: CUsuNavigation;
  vNivel                : VCondicionColeg;
  vTipo                 : VGradoAcad;
}
