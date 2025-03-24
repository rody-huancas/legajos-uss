import { useEffect, useState } from "react";
import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
/* Components */
import InputEmpty from "@shared/components/ui/InputField/InputEmpty";
import InputField from "@shared/components/ui/InputField/InputField";
import ReactSelect from "@shared/components/ui/ReactSelect/ReactSelect";
import InputDatePicker from "@shared/components/ui/DatePicker/DatePicker";
/* Hooks */
import { useCountries } from "../hooks/useCountries";
import { useFormOptions } from "../hooks/useFormOptions";
/* Models */
import { IInterface } from "../models/information-general.model";
import { ILegDatosGenerales } from "../models/general-information.model";
/* Utils */
import { calculateAge } from "@shared/utils/globals.util";
import { formatToOptions } from "../utils";
/* Schemas */
import { LegajoDataSchemaType } from "../schemas/general-information.validation";

interface Props {
  control    : Control<LegajoDataSchemaType>;
  watch      : UseFormWatch<LegajoDataSchemaType>;
  errors     : FieldErrors<LegajoDataSchemaType>;
  register   : UseFormRegister<LegajoDataSchemaType>;
  generalData: ILegDatosGenerales;
}

export const SectionGeneralData = (props: Props) => {
  const { control, watch, errors, register, generalData } = props;

  const { ubigeo } = useCountries();
  const { options, loadingStates } = useFormOptions();

  // States
  const [age, setAge]                   = useState<number>();
  const [provinces, setProvinces]       = useState<IInterface[]>([]);
  const [districts, setDistricts]       = useState<IInterface[]>([]);
  const [provincesNac, setProvincesNac] = useState<IInterface[]>([]);
  const [districtsNac, setDistrictsNac] = useState<IInterface[]>([]);

  useEffect(() => {
    const fechaNacimiento = watch("dLegDatFechaNacimiento");
    const dptoCode = watch("dptodomic.value");
    const provCode = watch("provdomic.value");

    setProvinces([]);
    setDistricts([]);

    if (fechaNacimiento) {
      setAge(calculateAge(new Date(fechaNacimiento)));
    } else {
      setAge(undefined);
    }

    if (dptoCode) {
      const dpto = ubigeo.find((x) => x.nIntCodigo == dptoCode);
      if (dpto) {
        setProvinces(
          ubigeo.filter(
            (x) =>
              x.cIntJerarquia.startsWith(dpto.cIntJerarquia.trim()) &&
              x.cIntJerarquia.length === 4
          )
        );
      }
    }

    if (provCode) {
      const prov = ubigeo.find((x) => x.nIntCodigo == provCode);
      if (prov) {
        setDistricts(
          ubigeo.filter(
            (x) =>
              x.cIntJerarquia.startsWith(prov.cIntJerarquia.trim()) &&
              x.cIntJerarquia.length === 6
          )
        );
      }
    }
  }, [watch("dLegDatFechaNacimiento"), watch("dptodomic"), watch("provdomic")]);

  useEffect(() => {
    setProvincesNac([]);
    setDistrictsNac([]);

    const codeDepartment = watch("departamentoNac.value");
    const codeProvince = watch("provinciaNac.value");

    if (codeDepartment) {
      const dpto = ubigeo.find((x) => x.nIntCodigo == codeDepartment);
      if (dpto) {
        setProvincesNac(
          ubigeo.filter(
            (x) =>
              x.cIntJerarquia.startsWith(dpto.cIntJerarquia.trim()) &&
              x.cIntJerarquia.length === 4
          )
        );
      }
    }

    if (codeProvince) {
      const prov = ubigeo.find((x) => x.nIntCodigo == codeProvince);
      if (prov) {
        setDistrictsNac(
          ubigeo.filter(
            (x) =>
              x.cIntJerarquia.startsWith(prov.cIntJerarquia.trim()) &&
              x.cIntJerarquia.length === 6
          )
        );
      }
    }
  }, [watch("departamentoNac"), watch("provinciaNac")]);

  const provinceOptions    = formatToOptions(provinces);
  const districtOptions    = formatToOptions(districts);
  const provinceNacOptions = formatToOptions(provincesNac);
  const districtNacOptions = formatToOptions(districtsNac);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-2">
        {/* Left */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
          <div className="sm:col-span-2">
            <ReactSelect
              label="Nacionalidad"
              name="nLegDatPais"
              control={control}
              options={options.nationality}
              placeholder="Seleccione una nacionalidad"
              errorMessage={errors.nLegDatPais?.message}
              isLoading={loadingStates.nationality}
            />
          </div>

          <ReactSelect
            label="Tipo de Documento"
            name="vTipoDoc"
            control={control}
            options={options.documentIdentity}
            placeholder="Seleccione un documento"
            errorMessage={errors.vTipoDoc?.message}
            isLoading={loadingStates.documentIdentity}
          />
          <InputField
            label="N° Documento de Identidad" register={register} name="cLegDatNroDoc" error={errors.cLegDatNroDoc} placeholder="N° Documento de Identidad" value={generalData.cLegDatNroDoc}
          />
          <InputField
            label="Apellido Paterno" register={register} name="cLegDatApellidoPaterno" error={errors.cLegDatApellidoPaterno} placeholder="Apellido Paterno" classContainer="sm:col-span-2" 
          />
          <InputField
            label="Apellido Materno" register={register} name="cLegDatApellidoMaterno" error={errors.cLegDatApellidoMaterno} placeholder="Apellido Materno" classContainer="sm:col-span-2" 
          />
          <InputField
            label="Nombres" register={register} name="cLegDatNombres" error={errors.cLegDatNombres} placeholder="Nombres" classContainer="sm:col-span-2"
          />
        </div>

        {/* Right */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
          <InputDatePicker
            control={control} name="dLegDatFechaNacimiento" label="Fecha de nacimiento" required placeholder="Selecciona una fecha" errorMessage={errors.dLegDatFechaNacimiento?.message} 
          />

          <InputEmpty label="Edad" disabled value={age !== undefined && age !== null ? `${age} Años` : "Edad"} />

          <ReactSelect
            label="Estado Civil"
            name="vEstadoCivil"
            control={control}
            options={options.maritalStatus}
            placeholder="Seleccione una estado civil"
            errorMessage={errors.vEstadoCivil?.message}
            isLoading={loadingStates.maritalStatus}
          />

          <ReactSelect
            label="Sexo"
            name="vSexo"
            control={control}
            options={options.sexo}
            placeholder="Seleccione una estado civil"
            errorMessage={errors.vSexo?.message}
            isLoading={loadingStates.sexo}
          />

          <InputField
            label="E-mail" register={register} name="cLegDatEmail" error={errors.cLegDatEmail} placeholder="E-mail" classContainer="sm:col-span-2"
          />
          <InputField
            label="Móvil" register={register} name="cLegDatMovil" error={errors.cLegDatMovil} placeholder="Móvil"
          />
          <InputField
            label="Teléfono" register={register} name="cLegDatTelefono" error={errors.cLegDatTelefono} placeholder="Teléfono"
          />

          <ReactSelect
            label="Mayor Grado Académico"
            name="vGradoAcad"
            control={control}
            options={options.academicDegree}
            placeholder="Seleccione una grado académico"
            errorMessage={errors.vGradoAcad?.message}
            isLoading={loadingStates.academicDegree}
          />

          <ReactSelect
            label="Idioma Nativo"
            name="vIdiomaNativo"
            control={control}
            options={options.languages}
            placeholder="Seleccione un idioma"
            errorMessage={errors.vIdiomaNativo?.message}
            isLoading={loadingStates.languages}
          />
        </div>
      </div>

      <div className="space-y-2 mt-3">
        <span className="text-lg font-bold text-secondary-800/70 underline">
          Datos de Domicilio
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-2">
          {/* Left */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-3">
            <ReactSelect
              label="Tipo Zona"
              name="vZona"
              control={control}
              options={options.zoneTypes}
              placeholder="Seleccione una tipo zona"
              errorMessage={errors.vZona?.message}
              isLoading={loadingStates.zoneTypes}
            />
            <ReactSelect
              label="Tipo Calle"
              name="vTipoDomicilio"
              control={control}
              options={options.streetType}
              placeholder="Seleccione una tipo zona"
              errorMessage={errors.vTipoDomicilio?.message}
              isLoading={loadingStates.streetType}
            />

            <InputField
              label="Dirección" register={register} name="cLegDatCalleDomicilio" error={errors.cLegDatCalleDomicilio} placeholder="Dirección" classContainer="lg:col-span-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            <InputField
              label="Número Domicilio" register={register} name="cLegDatNroDomicilio" error={errors.cLegDatNroDomicilio} placeholder="Número Domicilio"
            />
            <InputField
              label="Departamento" register={register} name="cLegDatDptoDomicilio" error={errors.cLegDatDptoDomicilio} placeholder="Departamento"
            />
            <InputField
              label="Manzana Domicilio" register={register} name="cLegDatMzaDomicilio" error={errors.cLegDatMzaDomicilio} placeholder="Manzana Domicilio" classContainer="sm:col-span-2 lg:col-span-1"
            />
            <InputField
              label="Lote Domicilio" register={register} name="cLegDatLtDomicilio" error={errors.cLegDatLtDomicilio} placeholder="Lote Domicilio" classContainer="sm:col-span-2 lg:col-span-1"
            />
          </div>

          <InputField
            label="Referencia" register={register} name="cLegDatReferencia" error={errors.cLegDatReferencia} placeholder="Referencia" classContainer="sm:col-span-2"
          />

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <ReactSelect
              label="Departamento"
              name="dptodomic"
              control={control}
              options={options.departments}
              placeholder="Seleccione una departamento"
              errorMessage={errors.dptodomic?.message}
              isLoading={loadingStates.departments}
            />

            <ReactSelect
              label="Provincia" name="provdomic" control={control} options={provinceOptions} placeholder="Seleccione una provincia" errorMessage={errors.provdomic?.message}
            />

            <ReactSelect
              label="Distrito" name="distdomic" control={control} options={districtOptions} placeholder="Seleccione una distrito" errorMessage={errors.distdomic?.message}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-3">
        <span className="text-lg font-bold text-secondary-800/70 underline">
          Lugar de Nacimiento
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ReactSelect
            label="País"
            name="paisNac"
            control={control}
            options={options.nationality}
            placeholder="Seleccione una país"
            errorMessage={errors.paisNac?.message}
            isLoading={loadingStates.nationality}
          />

          <ReactSelect
            label="Departamento"
            name="departamentoNac"
            control={control}
            options={options.departments}
            placeholder="Seleccione una departamento"
            errorMessage={errors.departamentoNac?.message}
            isLoading={loadingStates.departments}
          />

          <ReactSelect
            label="Provincia"
            name="provinciaNac"
            control={control}
            options={provinceNacOptions}
            placeholder="Seleccione una provincia"
            errorMessage={errors.provinciaNac?.message}
          />

          <ReactSelect
            label="Distrito"
            name="distritoNac"
            control={control}
            options={districtNacOptions}
            placeholder="Seleccione una distrito"
            errorMessage={errors.distritoNac?.message}
          />
        </div>
      </div>
    </div>
  );
};
