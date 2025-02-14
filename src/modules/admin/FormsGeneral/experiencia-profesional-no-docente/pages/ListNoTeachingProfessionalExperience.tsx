import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalNoTeachingProfessionalExperience from "./ModalNoTeachingProfessionalExperience";
/* Models */
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
/* Columns */
import { columnsNoTeachingProfessionalExperience } from "../data/columnsNoTeachingProfessionalExperience";
/* Store */
import { useDialogStore } from "@store/ui/useDialog.store";
/* Services */
import { noTeachingProfessionalExperienceService } from "../services";
/* Utils */
import { showNotification } from "@shared/utils/notification.util";

interface Props {
  legGradoTitulo?: ILegGradoTitulo[];
}

const ListNoTeachingProfessionalExperience = ({ legGradoTitulo }: Props) => {
  const queryClient = useQueryClient();
  // store
  const openDialog  = useDialogStore((state) => state.openDialog);
  // states
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idDegree, setIdDegree]   = useState<number | null>(null)

  if (!legGradoTitulo) return;
  const nLegGraDatCodigo = legGradoTitulo[0].nLegGraDatCodigo;

  // listar la experiencia profesional no docente
  const { data: noTeachingProfessionalExperience, isLoading, isFetching, isError } = useQuery({
    queryKey: ["noTeachingProfessionalExperience", nLegGraDatCodigo],
    queryFn: async () => {
      const response = await noTeachingProfessionalExperienceService.getLstNoTeachingProfessionalExperience(nLegGraDatCodigo);
      return response;
    },
  });

  // eliminar la experiencia profesional no docente
  const { mutate: deleteNoTeachingProfessionalExperience, isPending: loadDelete } = useMutation({
    mutationFn: async (id: number) => {
      await noTeachingProfessionalExperienceService.removeNoTeachingProfessionalExperience(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noTeachingProfessionalExperience", nLegGraDatCodigo] });
      showNotification("success", "Experiencia profesional no docente se eliminó correctamente.");
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const handleDelete = async (id: number) => {
    const confirmed = await openDialog({
      title   : "Confirmar eliminación",
      message : "¿Está seguro de que desea eliminar esta experiencia profesional no docente?",
      type    : "delete"
    });

    if (confirmed) deleteNoTeachingProfessionalExperience(id);
  };


  const handleEdit = (id: number) => {
    setIdDegree(id);
    setOpenModal(true);
  };

  if (isError) {
    return <AlertMessage variant="error" title="Error al cargar el experiencia profesional no docente" />;
  }

  return (
    <div className = "overflow-x-auto">
      {
        isLoading || isFetching || loadDelete ? (
          <Loader />
        ) : (
          <Table
            columns={columnsNoTeachingProfessionalExperience({ handleDelete, handleEdit })}
            data={noTeachingProfessionalExperience ?? []}
            messageNoData="No se ha registrado experiencia profesional no docente."
          />
        )
      }

      {
        openModal && (
          <ModalNoTeachingProfessionalExperience showModal={openModal} onClose={() => setOpenModal(false)} id={idDegree} legGradoTitulo={legGradoTitulo} />
        )
      }
    </div>
  );
};

export default ListNoTeachingProfessionalExperience;