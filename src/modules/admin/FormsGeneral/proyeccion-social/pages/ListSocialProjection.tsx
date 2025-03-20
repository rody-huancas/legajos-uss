import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalSocialProjection from "./ModalSocialProjection";
/* Columns */
import { columnsSocialProjection } from "../data/columnsSocialProjection";
/* Store */
import { useDialogStore } from "@store/ui/useDialog.store";
/* Services */
import { socialProjectionService } from "../services";
/* Utils */
import { showNotification } from "@shared/utils/notification.util";

interface Props {
  nLegDatCodigo: number;
}

const ListSocialProjection = ({ nLegDatCodigo }: Props) => {
  const queryClient = useQueryClient();
  // store
  const openDialog  = useDialogStore((state) => state.openDialog);
  // states
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idDegree, setIdDegree]   = useState<number | null>(null)

  if (!nLegDatCodigo) return;
  
  // listar la proyección social
  const { data: socialProjections, isLoading, isFetching, isError } = useQuery({
    queryKey: ["socialProjections", nLegDatCodigo],
    queryFn: async () => {
      const response = await socialProjectionService.getLstSocialProjections(nLegDatCodigo);
      return response;
    },
  });

  // eliminar la proyección social
  const { mutate: removeSocialProjection, isPending: loadDelete } = useMutation({
    mutationFn: async (id: number) => {
      await socialProjectionService.removeSocialProjection(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socialProjections", nLegDatCodigo] });
      showNotification("success", "La proyección social se eliminó correctamente.");
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const handleDelete = async (id: number) => {
    const confirmed = await openDialog({
      title   : "Confirmar eliminación",
      message : "¿Está seguro de que desea eliminar esta proyección social?",
      type    : "delete"
    });

    if (confirmed) removeSocialProjection(id);
  };


  const handleEdit = (id: number) => {
    setIdDegree(id);
    setOpenModal(true);
  };

  if (isError) {
    return <AlertMessage variant="error" title="Error al cargar las proyecciones sociales" />;
  }

  return (
    <div className = "overflow-x-auto">
      {
        isLoading || isFetching || loadDelete ? (
          <Loader />
        ) : (
          <Table
            columns={columnsSocialProjection({ handleDelete, handleEdit })}
            data={socialProjections ?? []}
            messageNoData="No se ha registrado la proyección social."
          />
        )
      }

      {
        openModal && (
          <ModalSocialProjection showModal={openModal} onClose={() => setOpenModal(false)} id={idDegree} nLegDatCodigo={nLegDatCodigo} />
        )
      }
    </div>
  );
};

export default ListSocialProjection;