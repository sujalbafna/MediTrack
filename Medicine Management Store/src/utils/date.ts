export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

export const isExpiringSoon = (expiryDate: string, thresholdDays: number = 30): boolean => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= thresholdDays && diffDays > 0;
};

export const isExpired = (expiryDate: string): boolean => {
  return new Date(expiryDate) <= new Date();
};