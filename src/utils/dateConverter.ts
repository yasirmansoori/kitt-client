function convertStringToShortDate(dateString: string): string {
  // month, and day using substring
  const month: number = parseInt(dateString.substring(4, 6), 10) - 1; // Month is 0-indexed
  const day: number = parseInt(dateString.substring(6, 8), 10);

  // month names
  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //  month name and format the day
  const formattedDate: string = `${monthNames[month]} ${day}`;

  return formattedDate;
}

export { convertStringToShortDate };
