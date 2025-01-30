import axios, { AxiosError } from "axios";
import { showNotification } from "@shared/utils/notification.util";

interface ApiErrorResponse {
  message    : string;
  statusCode?: number;
  error     ?: string;
}

interface ErrorHandlerOptions {
  defaultMessage         ?: string;
  showDefaultNotification?: boolean;
  throwError             ?: boolean;
}

export const handleAxiosError = (error: unknown, options: ErrorHandlerOptions = {}): never | void => {
  const {
    defaultMessage = "Ocurrió un error en la operación.", showDefaultNotification = true, throwError = true
  } = options;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorMessage = axiosError.response?.data?.message;

    if (errorMessage) {
      showNotification("error", errorMessage);
    } else if (showDefaultNotification) {
      showNotification("error", defaultMessage);
    }
  } else if (showDefaultNotification) {
    showNotification("error", defaultMessage);
  }

  if (throwError) {
    throw error;
  }
};
