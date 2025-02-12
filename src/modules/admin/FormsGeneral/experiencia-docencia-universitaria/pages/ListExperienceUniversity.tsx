import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalExperienceUniversity from "./ModalExperienceUniversity";
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
import { experienceUnivesityService } from "../services";
import { ColumnsExperienceUniversity } from "../data/ColumnsExperienceUniversity";
import { useDialogStore } from "@store/ui/useDialog.store";
import { showNotification } from "@shared/utils/notification.util";

interface Props {
  legGradoTitulo: ILegGradoTitulo[];
}

const ListExperienceUniversity = ({ legGradoTitulo }: Props) => {
  if (!legGradoTitulo || legGradoTitulo.length === 0) return null;

  const queryClient = useQueryClient();

  const dataFilter = legGradoTitulo?.[0];
  const nLegGraDatCodigo = dataFilter.nLegGraDatCodigo;

  const openDialog  = useDialogStore((state) => state.openDialog);

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [idDegree, setIdDegree]   = useState<number | null>(null)

  const { data: experienceUniversity, isLoading, isFetching, isError } = useQuery({
    queryKey: ["experiencesUniversity", nLegGraDatCodigo],
    queryFn: async () => {
      const response = await experienceUnivesityService.getExperiencesUniversity(nLegGraDatCodigo);
      return response;
    },
  });

  const { mutate: deleteDegreeTitle, isPending: loadDelete } = useMutation({
    mutationFn: async (id: number) => {
      await experienceUnivesityService.removeExperienceUniversity(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiencesUniversity", nLegGraDatCodigo] });
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
        />
      )}
      
      {
        openModal && (
          <ModalExperienceUniversity showModal={openModal} onClose={() => setOpenModal(false)} id={idDegree} legGradoTitulo={legGradoTitulo} />
        )
      }
    </div>
  );
};

export default ListExperienceUniversity;