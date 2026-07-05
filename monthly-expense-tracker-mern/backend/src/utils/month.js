export const normalizeMonth = (month) => {
  if (!month) {
    return new Date().toISOString().slice(0, 7);
  }

  const validMonth = /^\d{4}-(0[1-9]|1[0-2])$/.test(month);

  if (!validMonth) {
    const error = new Error("Month must be in YYYY-MM format");
    error.statusCode = 400;
    throw error;
  }

  return month;
};

export const getMonthRange = (month) => {
  const normalizedMonth = normalizeMonth(month);
  const [year, monthNumber] = normalizedMonth.split("-").map(Number);

  const startDate = new Date(Date.UTC(year, monthNumber - 1, 1, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, monthNumber, 1, 0, 0, 0));

  return { month: normalizedMonth, startDate, endDate };
};
