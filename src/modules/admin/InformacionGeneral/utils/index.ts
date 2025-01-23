import { IBaseDataGI, IBaseOptionGI } from "../models/information-general.model";

export const formatToOptions = (data: IBaseDataGI[] | undefined): IBaseOptionGI[] => {
  if (!data) return [];

  return data.map((item) => ({
    value: item.nIntCodigo ?? item.nConValor ?? 0,
    label: item.cIntDescripcion ?? item.cConDescripcion ?? "",
  }));
};
