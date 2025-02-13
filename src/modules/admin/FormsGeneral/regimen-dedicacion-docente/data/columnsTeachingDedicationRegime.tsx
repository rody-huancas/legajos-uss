/* Models */
import { IColumn } from "@shared/models/global.model";
import { ITeachingDedicactionsRegime } from "../models/teaching-dedication-regime.model";
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

export const columnsTeachingDedicationRegime = ({ handleDelete, handleEdit }: Props): IColumn<ITeachingDedicactionsRegime>[] => [
    {
      header: "Opciones",
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button type="button" onClick={() => handleEdit(row.nLegRegCodigo)} className="bg-indigo-600 text-secondary-100 p-1.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            <FaRegEdit size={14} />
          </button>
          <button type="button" onClick={() => handleDelete(row.nLegRegCodigo)} className="bg-red-600 text-secondary-100 p-1.5 rounded-lg hover:bg-red-700 transition-colors duration-300">
            <MdDeleteOutline size={14} />
          </button>
        </div>
      ),
    },
    {
      key: "cLegCatInstitucionNavigation",
      header: "Institución",
      render: (row) => (
        <span>{(row.cLegCatInstitucionNavigation?.cPerNombre ?? row.cLegRegOtraInst) || ""}</span>
      ),
    },
    {
      key: "vDedicacion",
      header: "Cargo",
      render: (row) => <span>{row.vDedicacion?.cConDescripcion || ""}</span>,
    },
    {
      key: "dLegRegFechaInicio",
      header: "Fecha de Inicio",
      render: (row) => (
        <span>{row.dLegRegFechaInicio && formatDate(row.dLegRegFechaInicio)}</span>
      ),
    },
    {
      key: "dLegRegFechaFin",
      header: "Fecha de Fin",
      render: (row) => (
        <span>{row.dLegRegFechaFin && formatDate(row.dLegRegFechaFin)}</span>
      ),
    },
    {
      key: "cLegRegArchivo",
      header: "Adj. Archivo",
      render: (row) =>
        row.cLegRegArchivo ? (
          <a
            href={`${API_FILE_PDF}/${row.cLegRegArchivo}`}
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