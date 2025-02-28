/* Models */
import { IColumn } from "@shared/models/global.model";
import { ISocialProjection } from "../models/social-projection.model";
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

export const columnsSocialProjection = ({ handleDelete, handleEdit }: Props): IColumn<ISocialProjection>[] => [
    {
      header: "Opciones",
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button type="button" onClick={() => handleEdit(row.nLegProyCodigo)} className="bg-indigo-600 text-secondary-100 p-1.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            <FaRegEdit size={14} />
          </button>
          <button type="button" onClick={() => handleDelete(row.nLegProyCodigo)} className="bg-red-600 text-secondary-100 p-1.5 rounded-lg hover:bg-red-700 transition-colors duration-300">
            <MdDeleteOutline size={14} />
          </button>
        </div>
      ),
    },
    {
      key: "cLegProyDescripcion",
      header: "Proyecto",
      render: (row) => (
        <span>{(row.cLegProyDescripcion) || ""}</span>
      ),
    },
    {
      key: "dLegProyFechaInicio",
      header: "Fecha Inicio",
      render: (row) => (
        <span>{row.dLegProyFechaInicio && formatDate(row.dLegProyFechaInicio)}</span>
      ),
    },
    {
      key: "dLegProyFechaFin",
      header: "Fecha Fin",
      render: (row) => (
        <span>{row.dLegProyFechaFin && formatDate(row.dLegProyFechaFin)}</span>
      ),
    },
    {
      key: "vTipo",
      header: "Tipo Participación",
      render: (row) => (
        <span>{row.vTipo.cConDescripcion ?? ""}</span>
      ),
    },
    {
      key: "cLegProyInstitucionNavigation",
      header: "Institución",
      render: (row) => (
        <span>{(row.cLegProyOtraInst ? row.cLegProyOtraInst : row.cLegProyInstitucionNavigation && row.cLegProyInstitucionNavigation.cPerNombre) || ""}</span>
      ),
    },
    {
      key: "cLegProyArchivo",
      header: "Adj. Archivo",
      render: (row) =>
        row.cLegProyArchivo ? (
          <a
            href={`${API_FILE_PDF}/${row.cLegProyArchivo}`}
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