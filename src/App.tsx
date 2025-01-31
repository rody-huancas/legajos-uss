import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "@routes/AppRouter";
import DialogModal from "@shared/components/ui/Modal/Dialog";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster richColors position="top-right" closeButton />
      <DialogModal />
    </QueryClientProvider>
  );
};

export default App;
