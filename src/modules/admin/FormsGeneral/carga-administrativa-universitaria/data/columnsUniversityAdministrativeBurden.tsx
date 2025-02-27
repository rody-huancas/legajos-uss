/* Models */
import { IColumn } from "@shared/models/global.model";
import { IUniversityAdministrativeBurden } from "../models/university-administrative-burden.model";
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

export const columnsUniversityAdministrativeBurden = ({ handleDelete, handleEdit }: Props): IColumn<IUniversityAdministrativeBurden>[] => [
    {
      header: "Opciones",
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button type="button" onClick={() => handleEdit(row.nLegAdmCodigo)} className="bg-indigo-600 text-secondary-100 p-1.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            <FaRegEdit size={14} />
          </button>
          <button type="button" onClick={() => handleDelete(row.nLegAdmCodigo)} className="bg-red-600 text-secondary-100 p-1.5 rounded-lg hover:bg-red-700 transition-colors duration-300">
            <MdDeleteOutline size={14} />
          </button>
        </div>
      ),
    },
    {
      key: "vCargo",
      header: "Cargo",
      render: (row) => (
        <span>{(row.vCargo.cConDescripcion) || ""}</span>
      ),
    },
    {
      key: "dLegAdmFechaInicio",
      header: "Fecha de Inicio",
      render: (row) => (
        <span>{row.dLegAdmFechaInicio && formatDate(row.dLegAdmFechaInicio)}</span>
      ),
    },
    {
      key: "dLegAdmFechaFin",
      header: "Fecha de Fin",
      render: (row) => (
        <span>{row.dLegAdmFechaFin && formatDate(row.dLegAdmFechaFin)}</span>
      ),
    },
    {
      key: "cLegAdmDocumento",
      header: "Documento",
      render: (row) => (
        <span>{(row.cLegAdmDocumento) || ""}</span>
      ),
    },
    {
      key: "cLegAdmInstitucion",
      header: "Institución",
      render: (row) => (
        <span>{(row.cLegAdmOtraInst ? row.cLegAdmOtraInst : row.cLegAdmInstitucionNavigation.cPerNombre) || ""}</span>
      ),
    },
    {
      key: "cLegAdmArchivo",
      header: "Adj. Archivo",
      render: (row) =>
        row.cLegAdmArchivo ? (
          <a
            href={`${API_FILE_PDF}/${row.cLegAdmArchivo}`}
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