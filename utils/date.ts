export const isoToTime = (isoString: string): string => {
  if (!isoString) return "00:00";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "00:00";

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const timeToIso = (timeString: string, baseIsoString: string): string => {
  if (!timeString.match(/^\d{2}:\d{2}$/)) return baseIsoString;

  const date = new Date(baseIsoString);
  if (isNaN(date.getTime())) return baseIsoString;

  const [hours, minutes] = timeString.split(":").map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

export const addMinutesToIso = (isoString: string, minutes: number): string => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;

  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
};
