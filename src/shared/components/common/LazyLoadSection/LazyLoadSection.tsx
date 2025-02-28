import { useInView } from "react-intersection-observer";

export const LazyLoadSection = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView ? (
        children
      ) : (
        <div className="h-48 bg-gray-200 animate-pulse rounded-md"></div>
      )}
    </div>
  );
};
