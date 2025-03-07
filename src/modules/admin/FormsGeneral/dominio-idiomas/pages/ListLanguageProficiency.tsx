import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalLanguageProficiency from "./ModalLanguageProficiency";
/* Models */
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
/* Columns */
import { columnsLanguageProficiency } from "../data/columnsLanguageProficiency";
/* Store */
import { useDialogStore } from "@store/ui/useDialog.store";
/* Services */
import { languageProficiencyService } from "../services";
/* Utils */
import { showNotification } from "@shared/utils/notification.util";

interface Props {
  legGradoTitulo?: ILegGradoTitulo[];
}

const ListLanguageProficiency = ({ legGradoTitulo }: Props) => {
  const queryClient = useQueryClient();
  // store
  const openDialog  = useDialogStore((state) => state.openDialog);
  // states
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idDegree, setIdDegree]   = useState<number | null>(null)

  if (!legGradoTitulo || legGradoTitulo.length <= 0) return;
  const nLegGraDatCodigo = legGradoTitulo[0].nLegGraDatCodigo;

  // listar la idiomas distintos al materno
  const { data: languagesProficiencies, isLoading, isFetching, isError } = useQuery({
    queryKey: ["languagesProficiencies", nLegGraDatCodigo],
    queryFn: async () => {
      const response = await languageProficiencyService.getLstLanguageProficiencies(nLegGraDatCodigo);
      return response;
    },
  });

  // eliminar idioma distinto al materno
  const { mutate: deleteLanguageProficiency, isPending: loadDelete } = useMutation({
    mutationFn: async (id: number) => {
      await languageProficiencyService.removeLanguageProficiency(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languagesProficiencies", nLegGraDatCodigo] });
      showNotification("success", "El Dominio de Idioma se eliminó correctamente.");
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  
  const handleDelete = async (id: number) => {
    const confirmed = await openDialog({
      title   : "Confirmar eliminación",
      message : "¿Está seguro de que desea eliminar este idioma?",
      type    : "delete"
    });

    if (confirmed) deleteLanguageProficiency(id);
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
            columns={columnsLanguageProficiency({ handleDelete, handleEdit })}
            data={languagesProficiencies ?? []}
            messageNoData="No se ha registrado dominio de idiomas."
          />
        )
      }

      {
        openModal && <ModalLanguageProficiency showModal={openModal} onClose={() => setOpenModal(false)} legGradoTitulo={legGradoTitulo} id={idDegree} />
      }
    </div>
  );
};

export default ListLanguageProficiency;