/* Models */
import { IColumn } from "@shared/models/global.model";
import { IDataGradoTitulo } from "@modules/admin/FormsGeneral/grados-titulos/repositories/grado-titulo.model";
/* Config */
import { API_FILE_PDF } from "@config/env.config";
/* Utils */
import { formatDate } from "@shared/utils/globals.util";
/* Icons */
import { PiEmpty } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiFilePdf2Fill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

export const columnsDegreesTitles: IColumn<IDataGradoTitulo>[] = [
    {
      header: "Opciones",
      cell: () => (
        <div className="flex items-center justify-center gap-1">
          <button className="bg-indigo-600 text-secondary-100 p-1.5 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            <FaRegEdit size={14} />
          </button>
          <button className="bg-red-600 text-secondary-100 p-1.5 rounded-lg hover:bg-red-700 transition-colors duration-300">
            <MdDeleteOutline size={14} />
          </button>
        </div>
      ),
    },
    { key: "cLegGraCarreraProf", header: "Carrera Profesional" },
    {
      key: "cLegGraInstitucionNavigation",
      header: "Institución",
      render: (row) => (
        <span>{row.cLegGraInstitucionNavigation?.cPerNombre || ""}</span>
      ),
    },
    {
      key: "vPais",
      header: "País",
      render: (row) => <span>{row.vPais?.cIntDescripcion || ""}</span>,
    },
    {
      key: "vGradoAcad",
      header: "Grado Académico",
      render: (row) => <span>{row.vGradoAcad?.cIntDescripcion || ""}</span>,
    },
    {
      key: "dLegGraFecha",
      header: "Fecha de Obtención",
      render: (row) => (
        <span>{row.dLegGraFecha && formatDate(row.dLegGraFecha)}</span>
      ),
    },
    {
      key: "cLegGraArchivo",
      header: "Adj. Archivo",
      render: (row) =>
        row.cLegGraArchivo ? (
          <a
            href={`${API_FILE_PDF}/${row.cLegGraArchivo}`}
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