export const getDeviationColorClass = (value, distance) => {
  if (value === "" || value === null || value === undefined) {
    return "deviationBlue";
  }

  const deviation = Number(value);
  const shotDistance = toFiniteNumber(distance);
  if (!Number.isFinite(deviation) || shotDistance === null || shotDistance <= 0) {
    return "deviationBlue";
  }

  const ratio = (Math.abs(deviation) / shotDistance) * 100;
  if (ratio <= 5) return "deviationBlue";
  if (ratio <= 10) return "deviationBlack";
  if (ratio <= 15) return "deviationOrange";
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
