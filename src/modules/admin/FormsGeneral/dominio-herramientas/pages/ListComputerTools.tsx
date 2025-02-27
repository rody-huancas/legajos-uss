import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalComputerTools from "./ModalComputerTools";
/* Models */
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
/* Columns */
import { columnsComputerTools } from "../data/columnsComputerTools";
/* Store */
import { useDialogStore } from "@store/ui/useDialog.store";
/* Services */
import { computerToolsService } from "../services";
/* Utils */
import { showNotification } from "@shared/utils/notification.util";

interface Props {
  legGradoTitulo?: ILegGradoTitulo[];
}

const ListComputerTools = ({ legGradoTitulo }: Props) => {
  const queryClient = useQueryClient();
  // store
  const openDialog  = useDialogStore((state) => state.openDialog);
  // states
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idDegree, setIdDegree]   = useState<number | null>(null)

  if (!legGradoTitulo || legGradoTitulo.length <= 0) return;
  const nLegGraDatCodigo = legGradoTitulo[0].nLegGraDatCodigo;

  const { data: computerTools, isLoading, isFetching, isError } = useQuery({
    queryKey: ["computerTools", nLegGraDatCodigo],
    queryFn: async () => {
      const response = await computerToolsService.getLstComputerTools(nLegGraDatCodigo);
      return response;
    },
  });

  const { mutate: deleteLanguageProficiency, isPending: loadDelete } = useMutation({
    mutationFn: async (id: number) => {
      await computerToolsService.removeComputerTools(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["computerTools", nLegGraDatCodigo] });
      showNotification("success", "El dominio de TIC's se eliminó correctamente.");
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  
  const handleDelete = async (id: number) => {
    const confirmed = await openDialog({
      title   : "Confirmar eliminación",
      message : "¿Está seguro de que desea eliminar este dominio de TIC's?",
      type    : "delete"
    });

    if (confirmed) deleteLanguageProficiency(id);
  };

  const handleEdit = (id: number) => {
    setIdDegree(id);
    setOpenModal(true);
  };

  if (isError) {
    return <AlertMessage variant="error" title="Error al cargar el dominio de TIC's" />;
  }

  return (
    <div className = "overflow-x-auto">
      {
        isLoading || isFetching || loadDelete ? (
          <Loader />
        ) : (
          <Table
            columns={columnsComputerTools({ handleDelete, handleEdit })}
            data={computerTools ?? []}
            messageNoData="No se ha registrado dominio de TIC's."
          />
        )
      }

      {
        openModal &&  <ModalComputerTools showModal={openModal} onClose={() => setOpenModal(false)} legGradoTitulo={legGradoTitulo} id={idDegree} />
      }
    </div>
  );
};

export default ListComputerTools;