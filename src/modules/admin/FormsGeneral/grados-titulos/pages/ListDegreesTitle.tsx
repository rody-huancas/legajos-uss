import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  /* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
  /* Data */
import { columnsDegreesTitles } from "../data/ColumnsDegreesTitles";
  /* Services */
  import { degreesTitleService } from "../services";
  /* Utils */
  import { showNotification } from "@shared/utils/notification.util";
  /* Store */
import { useDialogStore } from "@store/ui/useDialog.store";

interface Props {
  nLegGraDatCodigo: number;
}

const ListDegreesTitle = ({ nLegGraDatCodigo }: Props) => {
  const queryClient = useQueryClient();
  const openDialog  = useDialogStore((state) => state.openDialog);


  const { data: degreesTitle, isLoading, isError } = useQuery({
    queryKey: ["degreesTitle", nLegGraDatCodigo],
    queryFn : async () => {
      const response = await degreesTitleService.getDegreeTitle(nLegGraDatCodigo);
      return response;
    },
    enabled: !!nLegGraDatCodigo,
  });

  const { mutate: deleteDegreeTitle } = useMutation({
    mutationFn: async (id: number) => {
      await degreesTitleService.removeDegreeTitle(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["degreesTitle", nLegGraDatCodigo] });
      showNotification("success", "El título académico se eliminó correctamente.");
    },
    onError: () => {
      showNotification("error", "Ocurrió un error al eliminar el título académico.");
    },
  });

  const handleDelete = async (id: number) => {
    const confirmed = await openDialog({
      title   : "Confirmar eliminación",
      message : "¿Está seguro de que desea eliminar este título académico?",
      type    : "delete"
    });

    if (confirmed) {
      deleteDegreeTitle(id);
    }

  };

  if (isError) {
    return (
      <AlertMessage title = "Error al cargar los datos. Por favor, inténtelo de nuevo." />
    );
  }

  return (
    <div className = "overflow-x-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          columns = {columnsDegreesTitles(handleDelete)}
          data    = {degreesTitle || []}
        />
      )}
    </div>
  );
};

export default ListDegreesTitle;