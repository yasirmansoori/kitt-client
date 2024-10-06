function convertMinToHour(min: number) {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;

  if (hours === 0) {
    return `${minutes} mins`;
  }

  if (minutes === 0) {
    return `${hours} hours`;
  }

  return `${hours}h ${minutes}m`;
}

export { convertMinToHour };
