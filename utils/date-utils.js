export const getYearByDate = (date) => {
  const d = new Date(date);
  return d.getFullYear();
};

export const formatDate = (inputDate) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return formatter.format(new Date(inputDate || 0));
};
