import clsx from "clsx";

interface PlanViewSkeltonProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

function PlanViewSkelton({ isLoading, children }: PlanViewSkeltonProps) {
  return (
    <section className="mt-16">
      <div className="space-y-4">
        {/* Title skeleton */}
        <div
          className={clsx(
            "h-8 w-48 rounded-lg",
            isLoading && "animate-pulse bg-shadow"
          )}
        />

        {/* Plan cards skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={clsx(
                "aspect-video border border-border rounded-lg p-4",
                isLoading && "animate-pulse bg-shadow"
              )}
            />
          ))}
        </div>

        {children}
      </div>
    </section>
  );
}

export default PlanViewSkelton;
