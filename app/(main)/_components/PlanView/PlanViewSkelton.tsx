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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-4">
          {[...Array(6)].map((_, index) => (
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
