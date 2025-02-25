export interface IBaseResponse<T> {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : T;
}

export type IResponseLanguageProficiencies = IBaseResponse<ILanguageProficiency[]>;
export type IResponseLanguageProficiency   = IBaseResponse<ILanguageProficiency>;

export interface ILanguageProficiency {
  nLegIdOfCodigo:              number;
  nLegIdOfCodigoDesc:          number;
  nValorDesc:                  number;
  cLegIdOfTipo:                boolean;
  nLegIdOfNivel:               number;
  nValorNivel:                 number;
  dLegIdOfFecha:               Date;
  cFile:                       File;
  cLegIdOfArchivo:             string;
  nLegIdOfDatCodigo:           number;
  cLegIdOfValida:              boolean;
  cLegIdOfEstado:              boolean;
  cUsuRegistro:                string;
  dFechaRegistro:              Date;
  cUsuModifica:                string;
  dFechaModifica:              Date;
  cUsuModificaNavigation:      string;
  cUsuRegistroNavigation:      string;
  vCodigoDesc:                 VCodigoDesc;
  nLegIdOfDatCodigoNavigation: number;
  vNivel:                      VCodigoDesc;
}

export interface VCodigoDesc {
  nConCodigo:      number;
  nConValor:       number;
  cConDescripcion: string;
}

export interface ILanguageProficiencyPost {
  nLegIdOfCodigo   ?: number | undefined,
  nLegIdOfCodigoDesc: number,
  nValorDesc        : number,
  nLegIdOfNivel     : number,
  nValorNivel       : number,
  cLegIdOfTipo      : string,
  dLegIdOfFecha     : string,
  cFile            ?: File | null | undefined,
  cLegIdOfArchivo  ?: string | undefined,
  cLegIdOfValida    : string,
  cLegIdOfEstado    : string
}
