import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
  /* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalDegreesTitle from "./ModalDegreesTitle";
  /* Data */
import { columnsDegreesTitles } from "../data/ColumnsDegreesTitles";
/* Services */
import { degreesTitleService } from "../services";
/* Utils */
import { showNotification } from "@shared/utils/notification.util";
/* Store */
import { useDialogStore } from "@store/ui/useDialog.store";
/* Models */
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";

interface Props {
  legGradoTitulo?: ILegGradoTitulo[];
  nLegDatCodigo  : number;
}

const ListDegreesTitle = ({ legGradoTitulo, nLegDatCodigo }: Props) => {
  const queryClient = useQueryClient();

  if (!nLegDatCodigo) return;

  const nLegGraDatCodigo = nLegDatCodigo;

  // store
  const openDialog  = useDialogStore((state) => state.openDialog);

  // states
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idDegree, setIdDegree]   = useState<number | null>(null)

  const { data: degreesTitle, isLoading, isError } = useQuery({
    queryKey: ["degreesTitle", nLegGraDatCodigo],
    queryFn : async () => {
      const response = await degreesTitleService.getDegreesTitles(nLegGraDatCodigo);
      return response;
    },
    enabled: !!nLegGraDatCodigo,
    refetchOnWindowFocus: false,
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

  const handleEdit = (id: number) => {
    setIdDegree(id);
    setOpenModal(true);
  }

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
          columns = {columnsDegreesTitles({ handleDelete, handleEdit })}
          data    = {degreesTitle || []}
          messageNoData="Aún no se ha registrado los grados y títulos"
        />
      )}

      {
        openModal && (
          <ModalDegreesTitle showModal={openModal} onClose={() => setOpenModal(false)} id={idDegree} legGradoTitulo={legGradoTitulo} />
        )
      }
    </div>
  );
};

export default ListDegreesTitle;