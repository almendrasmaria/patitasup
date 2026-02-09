export const ageLabelToMonths = (ageLabel: string): number => {
  const value = parseInt(ageLabel, 10);

  if (ageLabel.includes("día")) {
    return Math.max(1, Math.round(value / 30));
  }

  if (ageLabel.includes("mes")) {
    return value;
  }

  if (ageLabel.includes("año")) {
    return value * 12;
  }

  return 0;
};