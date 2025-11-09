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
        <Chip color="primary" variant="contain">
          Chip
        </Chip>
        <Chip color="gray" variant="contain">
          Chip
        </Chip>
        <Chip color="gray" variant="outline">
          Chip
        </Chip>
        <Chip color="primary" variant="outline">
          Chip
        </Chip>
      </div>
    </div>
  );
};

export default DevPage;
