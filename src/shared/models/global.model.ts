export interface ResponseSuccess {
  ncode   : number;
  cstate  : boolean;
  cmessage: string;
  odata   : null;
}

export interface IColumn<T> {
  key?   : keyof T;
  header : string;
  render?: (row: T) => React.ReactNode;
  cell?  : () => React.ReactNode;
}