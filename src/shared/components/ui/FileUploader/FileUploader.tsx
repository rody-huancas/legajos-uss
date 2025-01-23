import  { useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { cn } from "@shared/utils/globals.util";
import { FaTimes, FaFilePdf } from "react-icons/fa";
import { UseFormSetValue, FieldValues, Path } from "react-hook-form";

type Accept = {
  [mimeType: string]: string[];
};

interface FileUploaderProps<T extends FieldValues> {
  name              : Path<T>;
  acceptedFileTypes?: string;
  maxFiles         ?: number;
  className        ?: string;
  title            ?: string;
  setValue         ?: UseFormSetValue<T>;
  error            ?: string;
}

const parseAccept = (acceptString: string): Accept => {
  const accept: Accept = {};
  const types = acceptString.split(",");

  types.forEach((type) => {
    if (type.startsWith(".")) {
      if (!accept["*/*"]) {
        accept["*/*"] = [];
      }
      accept["*/*"].push(type);
    } else {
      accept[type] = [];
    }
  });

  return accept;
};

const FileUploader = <T extends FieldValues>(props: FileUploaderProps<T>) => {
  const { name, acceptedFileTypes = "application/pdf", maxFiles = 1, className, title, setValue, error } = props

  const [files, setFiles] = useState<File[]>([]);
  const [dropzoneError, setDropzoneError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        setDropzoneError("Algunos archivos no son válidos o exceden el límite de tamaño.");
        return;
      }

      if (files.length + acceptedFiles.length > maxFiles) {
        setDropzoneError(`Solo puedes subir un máximo de ${maxFiles} archivos.`);
        return;
      }

      setDropzoneError(null);
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);

      if (setValue) {
        setValue(name, newFiles[0] as any);
      }
    },
    [files, maxFiles, name, setValue]
  );

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);

    if (setValue) {
      setValue(name, null as any);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: parseAccept(acceptedFileTypes),
    maxFiles,
  });

  return (
    <div className={cn("space-y-1", className)}>
      {title && <span className="font-medium text-secondary-800/90">{title}</span>}

      <div className="space-y-4">
        <div
          {...getRootProps()}
          className={cn(
            "p-6 border-2 border-dashed rounded-lg text-center cursor-pointer",
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
          )}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            {isDragActive
              ? "Suelta los archivos aquí..."
              : "Arrastra y suelta archivos aquí, o haz clic para seleccionarlos"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Tipos de archivo permitidos: {acceptedFileTypes}
          </p>
          <p className="text-sm text-gray-500">Máximo de archivos: {maxFiles}</p>
        </div>

        {(dropzoneError || error) && (
          <p className="text-red-500 text-sm">{dropzoneError || error}</p>
        )}

        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={file.name}
              className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <FaFilePdf className="text-red-500" size={20} />
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTimes size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;