import { Toaster } from "sonner";
import AppRouter from "@routes/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster richColors position="top-right" closeButton />
    </QueryClientProvider>
  );
};

export default App;
