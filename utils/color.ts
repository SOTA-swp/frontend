export const getHueFromString = (str: string, min = 0, max = 360): number => {
  const hash = Array.from(str).reduce(
    (acc, char) => (acc << 5) - acc + char.charCodeAt(0),
    0
  );
  return (hash % (max - min)) + min;
};
