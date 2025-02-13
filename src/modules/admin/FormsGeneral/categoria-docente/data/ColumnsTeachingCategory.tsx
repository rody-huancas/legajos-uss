/* Models */
import { IColumn } from "@shared/models/global.model";
import { ITeachingCategory } from "../models/teaching-category.model";
/* Config */
import { API_FILE_PDF } from "@config/env.config";
/* Utils */
import { formatDate } from "@shared/utils/globals.util";
/* Icons */
import { PiEmpty } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiFilePdf2Fill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  handleDelete: (id: number) => void;
  handleEdit  : (id: number) => void;
}

export const ColumnsTeachingCategory = ({ handleDelete, handleEdit }: Props): IColumn<ITeachingCategory>[] => [
    {
      header: "Opciones",
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button type="button" onClick={() => handleEdit(row.nLegCatCodigo)} className="bg-indigo-600 text-secondary-100 p-1.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            <FaRegEdit size={14} />
          </button>
          <button type="button" onClick={() => handleDelete(row.nLegCatCodigo)} className="bg-red-600 text-secondary-100 p-1.5 rounded-lg hover:bg-red-700 transition-colors duration-300">
            <MdDeleteOutline size={14} />
          </button>
        </div>
      ),
    },
    {
      key: "cLegCatInstitucionNavigation",
      header: "Nombre Institución",
      render: (row) => (
        <span>{(row.cLegCatInstitucionNavigation.cPerNombre ?? row.cLegCatOtraInst) || ""}</span>
      ),
    },
    {
      key: "vCategoria",
      header: "Cargo",
      render: (row) => (
        <span>{(row.vCategoria.cConDescripcion) || ""}</span>
      ),
    },
    {
      key: "dLegCatFechaInicio",
      header: "Fecha Inicio",
      render: (row) => (
        <span>{row.dLegCatFechaInicio && formatDate(row.dLegCatFechaInicio)}</span>
      ),
    },
    {
      key: "dLegCatFechaFin",
      header: "Fecha Fin",
      render: (row) => (
        <span>{row.dLegCatFechaFin && formatDate(row.dLegCatFechaFin)}</span>
      ),
    },
    {
      key: "cLegCatArchivo",
      header: "Adj. Archivo",
      render: (row) =>
        row.cLegCatArchivo ? (
          <a
            href={`${API_FILE_PDF}/${row.cLegCatArchivo}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center"
          >
            <RiFilePdf2Fill size={20} color="#ef4444" />
          </a>
        ) : (
          <PiEmpty />
        ),
    },
  ];