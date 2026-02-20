export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
};

export const formatDate = (isoString: string) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const formatDateTime = (isoString: string) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};
