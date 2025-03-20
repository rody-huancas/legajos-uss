import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalUniversityAdministrativeBurden from "./ModalUniversityAdministrativeBurden";
/* Columns */
import { columnsUniversityAdministrativeBurden } from "../data/columnsUniversityAdministrativeBurden";
/* Store */
import { useDialogStore } from "@store/ui/useDialog.store";
/* Services */
import { universityAdministrativeBurdenService } from "../services";
/* Utils */
import { showNotification } from "@shared/utils/notification.util";

interface Props {
  nLegDatCodigo: number;
}

const ListUniversityAdministrativeBurden = ({ nLegDatCodigo }: Props) => {
  const queryClient = useQueryClient();
  // store
  const openDialog  = useDialogStore((state) => state.openDialog);
  // states
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idDegree, setIdDegree]   = useState<number | null>(null)

  // listar la carga administrativa universitaria
  const { data: universitiesAdministrativeBurden, isLoading, isFetching, isError } = useQuery({
    queryKey: ["universitiesAdministrativeBurden", nLegDatCodigo],
    queryFn: async () => {
      const response = await universityAdministrativeBurdenService.getLstUniversityAdministrativeBurden(nLegDatCodigo);
      return response;
    },
  });

  // eliminar la carga administrativa universitaria
  const { mutate: deleteNoTeachingProfessionalExperience, isPending: loadDelete } = useMutation({
    mutationFn: async (id: number) => {
      await universityAdministrativeBurdenService.removeUniversityAdministrativeBurden(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["universitiesAdministrativeBurden", nLegDatCodigo] });
      showNotification("success", "Carga administrativa universitaria se eliminó correctamente.");
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const handleDelete = async (id: number) => {
    const confirmed = await openDialog({
      title   : "Confirmar eliminación",
      message : "¿Está seguro de que desea eliminar esta carga administrativa universitaria?",
      type    : "delete"
    });

    if (confirmed) deleteNoTeachingProfessionalExperience(id);
  };


  const handleEdit = (id: number) => {
    setIdDegree(id);
    setOpenModal(true);
  };

  if (isError) {
    return <AlertMessage variant="error" title="Error al cargar la carga administrativa universitaria" />;
  }

  return (
    <div className = "overflow-x-auto">
      {
        isLoading || isFetching || loadDelete ? (
          <Loader />
        ) : (
          <Table
            columns={columnsUniversityAdministrativeBurden({ handleDelete, handleEdit })}
            data={universitiesAdministrativeBurden ?? []}
            messageNoData="No se ha registrado la carga administrativa universitaria."
          />
        )
      }

      {
        openModal && (
          <ModalUniversityAdministrativeBurden showModal={openModal} onClose={() => setOpenModal(false)} id={idDegree} nLegDatCodigo={nLegDatCodigo} />
        )
      }
    </div>
  );
};

export default ListUniversityAdministrativeBurden;