import { useDialogStore } from "@store/ui/useDialog.store";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { dialogStyles, dialogIcons } from "./dialog.styles";

const DialogModal = () => {
  const { isOpen, title, message, confirmText, cancelText, type, closeDialog } = useDialogStore();

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => closeDialog(false)}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <DialogBackdrop className="fixed inset-0 bg-gray-900/75" />
        <DialogPanel className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <div className={dialogStyles({ type })}>
            {dialogIcons[type]}
            <div>
              <DialogTitle className="text-lg font-bold text-gray-900">
                {title}
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-600">{message}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => closeDialog(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={() => closeDialog(true)}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DialogModal;
