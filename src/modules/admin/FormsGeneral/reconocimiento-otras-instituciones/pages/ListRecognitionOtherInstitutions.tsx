import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalRecognitionOtherInstitutions from "./ModalRecognitionOtherInstitutions";
/* Columns */
import { columnsRecognitionOtherInstitutions } from "../data/columnsRecognitionOtherInstitutions";
/* Store */
import { useDialogStore } from "@store/ui/useDialog.store";
/* Services */
import { recognitionOtherInstitutionsService } from "../services";
/* Utils */
import { showNotification } from "@shared/utils/notification.util";

interface Props {
  nLegDatCodigo: number;
}

const ListRecognitionOtherInstitutions = ({ nLegDatCodigo }: Props) => {
  const queryClient = useQueryClient();
  // store
  const openDialog  = useDialogStore((state) => state.openDialog);
  // states
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idDegree, setIdDegree]   = useState<number | null>(null)

  if (!nLegDatCodigo) return;
  
  // listar el reconocimiento de otras instituciones
  const { data: recognitionOtherInstitutions, isLoading, isFetching, isError } = useQuery({
    queryKey: ["recognitionOtherInstitutions", nLegDatCodigo],
    queryFn: async () => {
      const response = await recognitionOtherInstitutionsService.getLstRecognitionOtherInstitutions(nLegDatCodigo);
      return response;
    },
    refetchOnWindowFocus: false,
  });

  // eliminar el reconocimiento de otras instituciones
  const { mutate: deleteNoTeachingProfessionalExperience, isPending: loadDelete } = useMutation({
    mutationFn: async (id: number) => {
      await recognitionOtherInstitutionsService.removeRecognitionOtherInstitution(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recognitionOtherInstitutions", nLegDatCodigo] });
      showNotification("success", "El reconocimiento de otras instituciones se eliminó correctamente.");
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const handleDelete = async (id: number) => {
    const confirmed = await openDialog({
      title   : "Confirmar eliminación",
      message : "¿Está seguro de que desea eliminar este reconocimiento?",
      type    : "delete"
    });

    if (confirmed) deleteNoTeachingProfessionalExperience(id);
  };


  const handleEdit = (id: number) => {
    setIdDegree(id);
    setOpenModal(true);
  };

  if (isError) {
    return <AlertMessage variant="error" title="Error al cargar el reconocimiento de otras instituciones" />;
  }

  return (
    <div className = "overflow-x-auto">
      {
        isLoading || isFetching || loadDelete ? (
          <Loader />
        ) : (
          <Table
            columns={columnsRecognitionOtherInstitutions({ handleDelete, handleEdit })}
            data={recognitionOtherInstitutions ?? []}
            messageNoData="No se ha registrado el reconocimiento de otras instituciones."
          />
        )
      }

      {
        openModal && (
          <ModalRecognitionOtherInstitutions showModal={openModal} onClose={() => setOpenModal(false)} id={idDegree} nLegDatCodigo={nLegDatCodigo} />
        )
      }
    </div>
  );
};

export default ListRecognitionOtherInstitutions;