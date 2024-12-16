export const getYearByDate = (date) => {
  const d = new Date(date);
  return d.getFullYear();
};
