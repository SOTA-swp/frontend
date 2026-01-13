import clsx from "clsx";

interface UserViewSkeltonProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}

function UserViewSkelton({ isLoading, children }: UserViewSkeltonProps) {
  return (
    <div
      className={clsx(
        "h-42 border border-border rounded-lg p-8",
        isLoading && "animate-pulse bg-shadow"
      )}>
      {children}
    </div>
  );
}

export default UserViewSkelton;
