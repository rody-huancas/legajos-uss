import { Toaster } from "sonner";
import AppRouter from "@routes/AppRouter";

const App = () => {
  return (
    <>
      <AppRouter />
      
      <Toaster richColors position="top-right" closeButton />
    </>
  );
};

export default App;
