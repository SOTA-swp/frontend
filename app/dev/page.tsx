import Chip from "@/components/Chip";

export interface DevPageProps {
  a: undefined;
}

const DevPage: React.FC<DevPageProps> = ({}) => {
  if (process.env.NODE_ENV !== "development") {
    return <div>Not Found</div>;
  }

  return (
    <div>
      Dev Page
      <div className="flex gap-2 p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Chip key={i}>Chip</Chip>
        ))}
      </div>
    </div>
  );
};

export default DevPage;
