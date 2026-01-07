export const getHueFromString = (str: string, min = 0, max = 360): number => {
  let hash = Array.from(str).reduce(
    (acc, char) => (acc << 5) - acc + char.charCodeAt(0),
    0
  );
  hash |= 0;
  hash = Math.imul(hash ^ (hash >>> 16), 0x85ebca6b);
  hash = Math.imul(hash ^ (hash >>> 13), 0xc2b2ae35);
  hash ^= hash >>> 16;
  return (hash % (max - min)) + min;
};
