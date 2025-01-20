export interface ILoginCredentials {
  pcPerUsuCodigo: string;
  pcPerUsuClave : string;
}

export interface ILoginResponse {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : Odata;
}

export interface Odata {
  cPerCodigo   : string;
  cPerApellido : string;
  cPerNombre   : string;
  cPerUsuCodigo: string;
  cPerTipoDoc  : string;
  cPerNroDoc   : string;
  cPerEmail    : string;
  cPerUsuClave : string;
  nTipo        : number;
  cTipoDesc    : string;
  cCargo       : string;
  idArea       : number;
  cArea        : string;
  nRol         : number;
  bLegajo      : boolean;
  cToken       : string;
  cPerUsuEstado: number;
}
