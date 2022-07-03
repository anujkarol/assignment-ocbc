export const formattedNumber = (x: number = 0) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
