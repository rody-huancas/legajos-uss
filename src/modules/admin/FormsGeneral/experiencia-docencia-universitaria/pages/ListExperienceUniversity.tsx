import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalExperienceUniversity from "./ModalExperienceUniversity";
import { useDialogStore } from "@store/ui/useDialog.store";
import { showNotification } from "@shared/utils/notification.util";
import { experienceUnivesityService } from "../services";
import { ColumnsExperienceUniversity } from "../data/ColumnsExperienceUniversity";

interface Props {
  nLegDatCodigo: number;
}

const ListExperienceUniversity = ({ nLegDatCodigo }: Props) => {
  if (!nLegDatCodigo) return null;

  const queryClient = useQueryClient();

  const openDialog  = useDialogStore((state) => state.openDialog);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idDegree, setIdDegree]   = useState<number | null>(null)

  const { data: experienceUniversity, isLoading, isFetching, isError } = useQuery({
    queryKey: ["experiencesUniversity", nLegDatCodigo],
    queryFn: async () => {
      const response = await experienceUnivesityService.getExperiencesUniversity(nLegDatCodigo);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteDegreeTitle, isPending: loadDelete } = useMutation({
    mutationFn: async (id: number) => {
      await experienceUnivesityService.removeExperienceUniversity(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiencesUniversity", nLegDatCodigo] });
      showNotification("success", "La experiencia universitaria se eliminó correctamente.");
    },
    onError: () => {
      showNotification("error", "Ocurrió un error al eliminar la experiencia universitaria.");
    },
  });

  const handleDelete = async (id: number) => {
    const confirmed = await openDialog({
      title   : "Confirmar eliminación",
      message : "¿Está seguro de que desea eliminar esta experiencia universitaria?",
      type    : "delete"
    });

    if (confirmed) {
      deleteDegreeTitle(id);
    }
  };

  const handleEdit = (id: number) => {
    setIdDegree(id);
    setOpenModal(true);
  };

  if (isError) {
    return <AlertMessage variant="error" title="Error al cargar la experiencia universitaria." />;
  }

  return (
    <div className="overflow-x-auto">
      {(isLoading || isFetching || loadDelete) ? (
       <Loader />
      ) : (
        <Table
          columns={ColumnsExperienceUniversity({ handleDelete, handleEdit })}
          data={experienceUniversity ?? []}
          messageNoData="No se ha registrado la experiencia universitaria"
        />
      )}
      
      {
        openModal && (
          <ModalExperienceUniversity showModal={openModal} onClose={() => setOpenModal(false)} id={idDegree} nLegDatCodigo={nLegDatCodigo} />
        )
      }
    </div>
  );
};

export default ListExperienceUniversity;