import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalTeachingDedicationRegime from "./ModalTeachingDedicationRegime";
/* Columns */
import { columnsTeachingDedicationRegime } from "../data/columnsTeachingDedicationRegime";
/* Store */
import { useDialogStore } from "@store/ui/useDialog.store";
/* Services */
import { teachingDedicationRegimeService } from "../services";
/* Utils */
import { showNotification } from "@shared/utils/notification.util";

interface Props {
  nLegDatCodigo: number;
}

const ListTeachingDedicationRegime = ({ nLegDatCodigo }: Props) => {
  const queryClient = useQueryClient();
  // store
  const openDialog  = useDialogStore((state) => state.openDialog);
  // states
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idDegree, setIdDegree]   = useState<number | null>(null)

  if (!nLegDatCodigo) return;
  
  // listar Régimen Dedicación Docente
  const { data: teachingCategories, isLoading, isFetching, isError } = useQuery({
    queryKey: ["teachingDedicationRegime", nLegDatCodigo],
    queryFn: async () => {
      const response = await teachingDedicationRegimeService.getTeachingDedicationsRegime(nLegDatCodigo);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  // eliminar categoría
  const { mutate: deleteTeachingCategory, isPending: loadDelete } = useMutation({
    mutationFn: async (id: number) => {
      await teachingDedicationRegimeService.removeTeachingDedicationRegime(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachingDedicationRegime", nLegDatCodigo] });
      showNotification("success", "Régimen dedicación docente se eliminó correctamente.");
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const handleDelete = async (id: number) => {
    const confirmed = await openDialog({
      title   : "Confirmar eliminación",
      message : "¿Está seguro de que desea eliminar este régimen dedicación docente?",
      type    : "delete"
    });

    if (confirmed) deleteTeachingCategory(id);
  };


  const handleEdit = (id: number) => {
    setIdDegree(id);
    setOpenModal(true);
  };

  if (isError) {
    return <AlertMessage variant="error" title="Error al cargar el régimen dedicación docente" />;
  }

  return (
    <div className = "overflow-x-auto">
      {
        isLoading || isFetching || loadDelete ? (
          <Loader />
        ) : (
          <Table
            columns={columnsTeachingDedicationRegime({ handleDelete, handleEdit })}
            data={teachingCategories ?? []}
            messageNoData="Aún no se ha registrado ningún régimen dedicación docente"
          />
        )
      }

      {
        openModal && (
          <ModalTeachingDedicationRegime showModal={openModal} onClose={() => setOpenModal(false)} id={idDegree} nLegDatCodigo={nLegDatCodigo} />
        )
      }
    </div>
  );
};

export default ListTeachingDedicationRegime;