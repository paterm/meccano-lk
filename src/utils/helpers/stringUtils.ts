export const toPriceFormat = (price: number | string) => {
  let result = price;

  if (typeof price === 'number') result = price.toFixed(0);
  return result.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
