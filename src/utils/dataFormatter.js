export function formatDate(isoString) {
  const date = new Date(isoString);

  return date
    .toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    .replace(',', '');
}
