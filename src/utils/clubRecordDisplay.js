export const getDeviationColorClass = (value) => {
  if (value === "" || value === null || value === undefined) {
    return "deviationBlue";
  }

  const deviation = Number(value);
  if (!Number.isFinite(deviation) || deviation <= 10) return "deviationBlue";
  if (deviation <= 20) return "deviationBlack";
  if (deviation <= 30) return "deviationOrange";
  return "deviationRed";
};

export const toFiniteNumber = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

export const formatAverage = (value) => {
  if (value === null) return "未入力";
  return String(Math.round(value));
};

export const formatDeviation = (value) => {
  const deviation = toFiniteNumber(value) ?? 0;
  return `${deviation}y`;
};
