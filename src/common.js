const formatNumber = (number) => {
  if (isNaN(number)) {
    return number;
  }

  return new Intl.NumberFormat("en-US").format(number);
};

const formatNumberCompact = (number) => {
  if (isNaN(number)) {
    return number;
  }

  return new Intl.NumberFormat("en", { notation: "compact" }).format(number);
};

/**
 * set the color for the status of the campaign*/
const setStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "info";
      break;
    case "approved":
      return "success";
      break;
    case "rejected":
      return "error";
      break;
    case "expired":
      return "warning";
      break;
    default:
      return "default";
      break;
  }
};

const formatBytes = (a, b = 2) => {
  if (!+a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
    ["Bytes", "KB", "MB", "GB", "TB", "PiB", "EiB", "ZiB", "YiB"][d]
  }`;
};
const bytesToMegaBytes = (bytes) => {
  if(bytes == 0) { return 0};
  return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
};
export { formatNumber, formatNumberCompact, setStatusColor, formatBytes, bytesToMegaBytes };
