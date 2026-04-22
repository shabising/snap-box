export function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  if (bytes >= 1024)        return (bytes / 1024).toFixed(1) + ' KB';
  return bytes + ' B';
}

export function formatType(mimeType) {
  return (mimeType.split('/')[1] || 'IMG').toUpperCase();
}