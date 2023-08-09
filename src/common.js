import jwt from "jsonwebtoken";
const jwtKey = process.env.NEXT_PUBLIC_JWT_KEY;
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
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${["Bytes", "KB", "MB", "GB", "TB", "PiB", "EiB", "ZiB", "YiB"][d]
    }`;
};
const bytesToMegaBytes = (bytes) => {
  if (bytes == 0) {
    return 0;
  }
  return (bytes / (1024 * 1024)).toFixed(2);
};

const generateVideoThumbnail = (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const video = document.createElement("video");

    // this is important
    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(file);

    video.onloadeddata = () => {
      let ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      video.pause();
      return resolve(canvas.toDataURL("image/jpeg", 0.8));
    };
  });
};

const handlePermissionAuth = (token, arr) => {
  if (!token) {
    return;
  }
  let result;
  try {
    result = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
  } catch (error) {
    console.log(error);
    return false;
  }
  const { role, companyId, companyRole } = result;
  if (!arr.includes(role)) {
    return false;
  }
  return true;
};

const handleRedirectAuth = (token) => {
  if (!token) {
    return;
  }
  let result;
  try {
    result = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY);
  } catch (error) {
    console.log(error);
    return "/";
  }
  const { role } = result;
  if (role == "advertiser") {
    return "/ad/dashboard";
  } else if (role == "adspace") {
    return "/ad-space/dashboard";
  }
};

const regexEmail = () => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
}
const regexFullDomainPath = () => {
  return /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(:[0-9]+)?(\/[^?#]*)?(\?[^#]*)?(#.*)?$/;
}

export {
  formatNumber,
  formatNumberCompact,
  setStatusColor,
  formatBytes,
  bytesToMegaBytes,
  generateVideoThumbnail,
  handlePermissionAuth,
  handleRedirectAuth,
  regexEmail,
  regexFullDomainPath
};
