import { useQuery } from "@tanstack/react-query";
/* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
/* Data */
import { columnsDegreesTitles } from "../data/ColumnsDegreesTitles";
/* Services */
import { degreesTitleService } from "../services";

interface Props {
  nLegGraDatCodigo: number;
}

const ListDegreesTitle = ({ nLegGraDatCodigo }: Props) => {
  const { data: degreesTitle, isLoading, isError } = useQuery({
    queryKey: ["degreesTitle", nLegGraDatCodigo],
    queryFn: async () => {
      const response = await degreesTitleService.getDegreeTitle(nLegGraDatCodigo);
      return response;
    },
    enabled: !!nLegGraDatCodigo,
  });

  if (isError) {
    return (
      <AlertMessage title="Error al cargar los datos. Por favor, inténtelo de nuevo." />
    );
  }

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <Table columns={columnsDegreesTitles} data={degreesTitle || []} />
      )}
    </div>
  );
};

export default ListDegreesTitle;
