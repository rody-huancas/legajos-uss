import { create } from "zustand";

interface DialogState {
  isOpen         : boolean;
  title          : string;
  message        : string;
  confirmText    : string;
  cancelText     : string;
  type           : "delete" | "warning" | "success" | "info";
  resolvePromise?: (value: boolean) => void;

  openDialog: (options: {
    title       : string;
    message     : string;
    confirmText?: string;
    cancelText ?: string;
    type       ?: "delete" | "warning" | "success" | "info";
  }) => Promise<boolean>;
  closeDialog: (confirmed: boolean) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen     : false,
  title      : "",
  message    : "",
  confirmText: "Confirmar",
  cancelText : "Cancelar",
  type       : "info",

  openDialog: (options) =>
    new Promise((resolve) => {
      set({
        isOpen        : true,
        title         : options.title,
        message       : options.message,
        confirmText   : options.confirmText || "Confirmar",
        cancelText    : options.cancelText  || "Cancelar",
        type          : options.type        || "info",
        resolvePromise: resolve,
      });
    }),

  closeDialog: (confirmed) => {
    set((state) => {
      if (state.resolvePromise) state.resolvePromise(confirmed);
      return {
        isOpen        : false,
        resolvePromise: undefined,
      };
    });
  },
}));
