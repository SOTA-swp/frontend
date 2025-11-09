type data = {
  title: string;
  sum: number;
};

export function UserInfoBlock(props: data) {
  const { title, sum } = props;
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-2 min-w-[150px]">
      <h3 className="text-text-secondary text-lg font-bold">{title}</h3>
      <p className="text-primary text-5xl font-bold mt-2">
        {sum}
        <span className="text-sm text-primary">個</span>
      </p>
    </div>
  );
}
