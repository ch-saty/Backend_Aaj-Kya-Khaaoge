export const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const otpExpiry = () => {
  return Date.now() + 1000 * 60 * 1; // 1 minute expiry
};
