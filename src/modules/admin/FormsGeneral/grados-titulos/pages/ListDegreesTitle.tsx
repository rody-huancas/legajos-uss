import { useEffect, useState } from "react";
/* Components */
import Table from "@shared/components/ui/Table/Table";
/* Data */
import { columnsDegreesTitles } from "../data/ColumnsDegreesTitles";
/* Repositories */
import { IDataGradoTitulo } from "../repositories/grado-titulo.model";
/* Services */
import { degreesTitleService } from "../services";

interface Props {
  nLegGraDatCodigo: number;
}

const ListDegreesTitle = ({ nLegGraDatCodigo }: Props) => {
  const [degreesTitle, setDegreesTitle] = useState<IDataGradoTitulo[]>([]);

  useEffect(() => {
    if (!nLegGraDatCodigo) return;
    const fetchDegreesTitle = async () => {
      const response = await degreesTitleService.getDegreeTitle(nLegGraDatCodigo);
      setDegreesTitle(response);
    };
    fetchDegreesTitle();
  }, [nLegGraDatCodigo]);

  return (
    <div className="overflow-x-auto">
      <Table columns={columnsDegreesTitles} data={degreesTitle} />
    </div>
  );
};

export default ListDegreesTitle;
