/* Models */
import { IColumn } from "@shared/models/global.model";
import { IComputerTools } from "../models/computer-tools.model";
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

export const columnsComputerTools = ({ handleDelete, handleEdit }: Props): IColumn<IComputerTools>[] => [
    {
      header: "Opciones",
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button type="button" onClick={() => handleEdit(row.nLegIdOfCodigo)} className="bg-indigo-600 text-secondary-100 p-1.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            <FaRegEdit size={14} />
          </button>
          <button type="button" onClick={() => handleDelete(row.nLegIdOfCodigo)} className="bg-red-600 text-secondary-100 p-1.5 rounded-lg hover:bg-red-700 transition-colors duration-300">
            <MdDeleteOutline size={14} />
          </button>
        </div>
      ),
    },
    {
      key: "vCodigoDesc",
      header: "Informática",
      render: (row) => (
        <span>{(row.vCodigoDesc.cConDescripcion) || ""}</span>
      ),
    },
    {
      key: "vNivel",
      header: "Nivel",
      render: (row) => <span>{row.vNivel.cConDescripcion || ""}</span>,
    },
    {
      key: "dLegIdOfFecha",
      header: "Fecha de Certificación",
      render: (row) => (
        <span>{row.dLegIdOfFecha && formatDate(row.dLegIdOfFecha)}</span>
      ),
    },
    {
      key: "cLegIdOfArchivo",
      header: "Adj. Archivo",
      render: (row) =>
        row.cLegIdOfArchivo ? (
          <a
            href={`${API_FILE_PDF}/${row.cLegIdOfArchivo}`}
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