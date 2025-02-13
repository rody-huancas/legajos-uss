import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
/* Components */
import Table from "@shared/components/ui/Table/Table";
import Loader from "@shared/components/ui/Loader/Loader";
import AlertMessage from "@shared/components/ui/AlertMessage/AlertMessage";
import ModalTeachingCategory from "./ModalTeachingCategory";
/* Models */
import { ILegGradoTitulo } from "@modules/admin/InformacionGeneral/models/general-information.model";
import { ColumnsTeachingCategory } from "../data/ColumnsTeachingCategory";
/* Services */
import { teachingCategoryService } from "../services";
/* Store */
import { useDialogStore } from "@store/ui/useDialog.store";
/* Utils */
import { showNotification } from "@shared/utils/notification.util";

interface Props {
  legGradoTitulo: ILegGradoTitulo[];
}

const ListTeachingCategory = ({ legGradoTitulo }: Props) => {
  if (!legGradoTitulo || legGradoTitulo.length === 0) return null;

  const queryClient = useQueryClient();
  
  const dataFilter = legGradoTitulo[0];
  const nLegGraDatCodigo = dataFilter.nLegGraDatCodigo;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idDegree, setIdDegree]   = useState<number | null>(null)

  const openDialog  = useDialogStore((state) => state.openDialog);

  // listar categorías del docente
  const { data: teachingCategories, isLoading, isFetching, isError } = useQuery({
    queryKey: ["teachingCategories", nLegGraDatCodigo],
    queryFn: async () => {
      const response = await teachingCategoryService.getTeachingCategories(nLegGraDatCodigo);
      return response;
    },
  });

  // eliminar categoría
  const { mutate: deleteTeachingCategory, isPending: loadDelete } = useMutation({
    mutationFn: async (id: number) => {
      await teachingCategoryService.removeTeachingCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachingCategories", nLegGraDatCodigo] });
      showNotification("success", "La categoría de docente se eliminó correctamente.");
    },
    onError: (error) => {
      showNotification("error", error.message);
    },
  });

  const handleDelete = async (id: number) => {
    const confirmed = await openDialog({
      title   : "Confirmar eliminación",
      message : "¿Está seguro de que desea eliminar esta categoría de docente?",
      type    : "delete"
    });

    if (confirmed) deleteTeachingCategory(id);
  };

  const handleEdit = (id: number) => {
    setIdDegree(id);
    setOpenModal(true);
  };
  
  if (isError) {
    return <AlertMessage variant="error" title="Error al cargar la categoría del docente" />;
  }

  return (
    <div className="overflow-x-auto">
      {
        isLoading || isFetching || loadDelete ? (
          <Loader />
        ) : (
          <Table
            columns={ColumnsTeachingCategory({ handleDelete, handleEdit })}
            data={teachingCategories ?? []}
            messageNoData="Aún no se ha registrado ninguna categoría de docente"
          />
        )
      }

      {
        openModal && (
          <ModalTeachingCategory showModal={openModal} onClose={() => setOpenModal(false)} id={idDegree} legGradoTitulo={legGradoTitulo} />
        )
      }
    </div>
  );
};

export default ListTeachingCategory;