import { FieldErrors, UseFormSetValue } from "react-hook-form";
/* Components */
import Button from "@shared/components/ui/Button/Button";
import FileUploader from "@shared/components/ui/FileUploader/FileUploader";
/* Schemas */
import { LegajoDataSchemaType } from "../schemas/general-information.validation";
/* Icons */
import { HiAcademicCap } from "react-icons/hi";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { ModalDegreesTitle } from "./Modals/ModalDegreesTitle";


interface Props {
  setValue: UseFormSetValue<LegajoDataSchemaType>;
  errors: FieldErrors<LegajoDataSchemaType>;
}

export const SectionDegreesTitles = (props: Props) => {
  const { setValue, errors } = props;
  const [addRegister, setAddRegister] = useState<boolean>(false)

  return (
    <>
      <div className="space-y-5 mb-7">
        <FileUploader
          name="cLegDatSunedu" title="Registro Sunedu (PDF)" acceptedFileTypes="application/pdf" setValue={setValue} error={errors.cLegDatSunedu?.message}
        />
  
        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <Button className="gap-2 px-7" onClick={() => setAddRegister(true)}>
              <HiAcademicCap size={20} /> Agregar
            </Button>
          </div>
  
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 border-b whitespace-nowrap">
                    Opciones  
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b whitespace-nowrap">
                    Carrera Profesional
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b whitespace-nowrap">
                    Institución
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b whitespace-nowrap">
                    País
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b whitespace-nowrap">
                    Grado Académico
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b whitespace-nowrap">
                    Fecha de Obtención
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b whitespace-nowrap">
                    Adj. Archivo
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Fila de ejemplo */}
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="flex items-center justify-center">
                      <Button variant="ghost">
                        <FaEdit size={20} color="#3b82f6" />
                      </Button>
                      <Button variant="ghost">
                        <MdDeleteForever size={20} color="#ef4444" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">Ingeniería de Software</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">Universidad Nacional</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">Perú</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">Bachiller</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">01/01/2023</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    <Button variant="ghost">
                      <FaFilePdf size={20} color="red" />
                    </Button>
                  </td>
                </tr>
  
                {/* Otra fila de ejemplo */}
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="flex items-center justify-center">
                      <Button variant="ghost">
                        <FaEdit size={20} color="#3b82f6" />
                      </Button>
                      <Button variant="ghost">
                        <MdDeleteForever size={20} color="#ef4444" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">Derecho</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">Universidad de Lima</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">Perú</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">Maestría</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">15/06/2022</td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    <Button variant="ghost">
                      <FaFilePdf size={20} color="red" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      { addRegister && <ModalDegreesTitle showModal={addRegister} onClose={() => setAddRegister(false)} /> }
    </>
  );
};