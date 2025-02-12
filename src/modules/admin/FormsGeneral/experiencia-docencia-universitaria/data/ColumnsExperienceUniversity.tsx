/* Models */
import { IColumn } from "@shared/models/global.model";
import { IExperienceUniversity } from "../models/experience-university.model";
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

export const ColumnsExperienceUniversity = ({ handleDelete, handleEdit }: Props): IColumn<IExperienceUniversity>[] => [
    {
      header: "Opciones",
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button onClick={() => handleEdit(row.nLegDocCodigo)} className="bg-indigo-600 text-secondary-100 p-1.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            <FaRegEdit size={14} />
          </button>
          <button onClick={() => handleDelete(row.nLegDocCodigo)} className="bg-red-600 text-secondary-100 p-1.5 rounded-lg hover:bg-red-700 transition-colors duration-300">
            <MdDeleteOutline size={14} />
          </button>
        </div>
      ),
    },
    { key: "cLegDocOtraInst", header: "Nombre Universidad" },
    {
      key: "vCategoria",
      header: "Régimen Dedicación",
      render: (row) => (
        <span>{(row.vCategoria.cConDescripcion) || ""}</span>
      ),
    },
    {
      key: "vRegimen",
      header: "Categoría Docente",
      render: (row) => (
        <span>{(row.vRegimen.cConDescripcion) || ""}</span>
      ),
    },
    {
      key: "dLegDocFechaInicio",
      header: "Fecha Inicio",
      render: (row) => (
        <span>{row.dLegDocFechaInicio && formatDate(row.dLegDocFechaInicio)}</span>
      ),
    },
    {
      key: "dLegDocFechaFin",
      header: "Fecha Fin",
      render: (row) => (
        <span>{row.dLegDocFechaFin && formatDate(row.dLegDocFechaFin)}</span>
      ),
    },
    {
      key: "cLegDocArchivo",
      header: "Adj. Archivo",
      render: (row) =>
        row.cLegDocArchivo ? (
          <a
            href={`${API_FILE_PDF}/${row.cLegDocArchivo}`}
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