const formatNumber = (number) => {
  if (isNaN(number)) {
    return number;
  }

  return new Intl.NumberFormat('en-US').format(number);
};

const formatNumberCompact = (number) => {
  if(isNaN(number)){
    return number;
  }

  return new Intl.NumberFormat('en', {notation: 'compact'}).format(number);
}


/**
 * set the color for the status of the campaign*/ 
const setStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'info'
      break;
    case 'approved' : 
      return 'success';
      break;
    case 'rejected' : 
      return 'error';
      break;
    case 'expired' : 
      return 'warning';
      break;
    default:
      return 'default';
      break;
  }
}



export {
  formatNumber,
  formatNumberCompact,
  setStatusColor
}