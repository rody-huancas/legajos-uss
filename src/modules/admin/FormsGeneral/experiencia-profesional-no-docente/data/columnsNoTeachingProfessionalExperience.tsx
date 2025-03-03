/* Models */
import { IColumn } from "@shared/models/global.model";
import { INoTeachingProfesionalExperiences } from "../models/no-teaching-profesional-exprience.model";
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

export const columnsNoTeachingProfessionalExperience = ({ handleDelete, handleEdit }: Props): IColumn<INoTeachingProfesionalExperiences>[] => [
    {
      header: "Opciones",
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button type="button" onClick={() => handleEdit(row.nLegProCodigo)} className="bg-indigo-600 text-secondary-100 p-1.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            <FaRegEdit size={14} />
          </button>
          <button type="button" onClick={() => handleDelete(row.nLegProCodigo)} className="bg-red-600 text-secondary-100 p-1.5 rounded-lg hover:bg-red-700 transition-colors duration-300">
            <MdDeleteOutline size={14} />
          </button>
        </div>
      ),
    },
    {
      key: "cLegProInstitucionNavigation",
      header: "Institución",
      render: (row) => (
        <span>{(row.cLegProOtraInst ? row.cLegProOtraInst : row.cLegProInstitucionNavigation && row.cLegProInstitucionNavigation.cPerNombre) || ""}</span>
        // <span>{(row.cLegProInstitucionNavigation ? row.cLegProInstitucionNavigation.cPerNombre : row.cLegProOtraInst) || ""}</span>
      ),
    },
    {
      key: "vCargo",
      header: "Cargo",
      render: (row) => <span>{row.vCargo.cConDescripcion || ""}</span>,
    },
    {
      key: "dLegProFechaInicio",
      header: "Fecha de Inicio",
      render: (row) => (
        <span>{row.dLegProFechaInicio && formatDate(row.dLegProFechaInicio)}</span>
      ),
    },
    {
      key: "dLegProFechaFin",
      header: "Fecha de Fin",
      render: (row) => (
        <span>{row.dLegProFechaFin && formatDate(row.dLegProFechaFin)}</span>
      ),
    },
    {
      key: "cLegProArchivo",
      header: "Adj. Archivo",
      render: (row) =>
        row.cLegProArchivo ? (
          <a
            href={`${API_FILE_PDF}/${row.cLegProArchivo}`}
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