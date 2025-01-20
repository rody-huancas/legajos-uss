import { Suspense, ComponentType } from "react";
import { RiLoaderLine } from "react-icons/ri";

const LoadingSpinner = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <RiLoaderLine className="animate-spin text-primary" size={40} />
  </div>
);

const withLazy = (Component: ComponentType) => {
  return (props: any) => (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};

export default withLazy;
