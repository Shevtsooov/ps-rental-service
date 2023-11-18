export const calculateDaysPassed = (createdAt: string) => {
  // Parse the createdAt string to a Date object
  const createdAtDate: Date = new Date(createdAt);

  // Get the current date
  const currentDate: Date = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds: number = currentDate.getTime() - createdAtDate.getTime();

  // Convert milliseconds to days
  const differenceInDays: number = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.floor(differenceInDays + 1.5);
}

