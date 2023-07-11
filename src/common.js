const formatNumber = (number) => {
  if (isNaN(number)) {
    return number;
  }

  return new Intl.NumberFormat('en-US').format(number);
};



export {
  formatNumber
}