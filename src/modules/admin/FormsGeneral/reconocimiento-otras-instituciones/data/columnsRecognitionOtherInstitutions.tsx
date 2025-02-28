/* Models */
import { IColumn } from "@shared/models/global.model";
import { IRecognitionOtherInstitutions } from "../models/recognition-other-institution.model";
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

export const columnsRecognitionOtherInstitutions = ({ handleDelete, handleEdit }: Props): IColumn<IRecognitionOtherInstitutions>[] => [
    {
      header: "Opciones",
      render: (row) => (
        <div className="flex items-center justify-center gap-1">
          <button type="button" onClick={() => handleEdit(row.nLegRecCodigo)} className="bg-indigo-600 text-secondary-100 p-1.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            <FaRegEdit size={14} />
          </button>
          <button type="button" onClick={() => handleDelete(row.nLegRecCodigo)} className="bg-red-600 text-secondary-100 p-1.5 rounded-lg hover:bg-red-700 transition-colors duration-300">
            <MdDeleteOutline size={14} />
          </button>
        </div>
      ),
    },
    {
      key: "vDocumento",
      header: "Documento/Evidencia",
      render: (row) => (
        <span>{(row.vDocumento.cConDescripcion) || ""}</span>
      ),
    },
    {
      key: "dLegRecFecha",
      header: "Fecha",
      render: (row) => (
        <span>{row.dLegRecFecha && formatDate(row.dLegRecFecha)}</span>
      ),
    },
    {
      key: "vTipo",
      header: "Tipo Reconocimiento",
      render: (row) => (
        <span>{row.vTipo.cConDescripcion ?? ""}</span>
      ),
    },
    {
      key: "cLegRecInstitucionNavigation",
      header: "Institución",
      render: (row) => (
        <span>{(row.cLegRecOtraInst ? row.cLegRecOtraInst : row.cLegRecInstitucionNavigation.cPerNombre) || ""}</span>
      ),
    },
    {
      key: "cLegRecArchivo",
      header: "Adj. Archivo",
      render: (row) =>
        row.cLegRecArchivo ? (
          <a
            href={`${API_FILE_PDF}/${row.cLegRecArchivo}`}
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