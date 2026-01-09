type data = {
  title: string;
  sum: number | string;
};

export function UserInfoBlock(props: data) {
  const { title, sum } = props;
  return (
    <p>
      <span className="text-text-secondary">{title}</span>
      <span className="ml-2 font-bold text-primary">{sum}</span>
    </p>
  );
}
