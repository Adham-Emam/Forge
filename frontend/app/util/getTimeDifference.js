const getTimeDifference = (timestamp) => {
  const givenDate = new Date(timestamp); // Convert the given timestamp to a Date object
  const currentDate = new Date(); // Get the current date and time

  const differenceInMs = currentDate - givenDate; // Calculate the difference in milliseconds

  // Convert milliseconds to different time units
  const seconds = Math.floor(differenceInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Approximate a month as 30 days
  const years = Math.floor(days / 365); // Approximate a year as 365 days

  // Return the appropriate time difference
  if (years > 0) {
    return `${years === 1 ? "a" : years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months === 1 ? "a" : months} month${months > 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks === 1 ? "a" : weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days === 1 ? "a" : days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours === 1 ? "a" : hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes === 1 ? "a" : minutes} minute${
      minutes > 1 ? "s" : ""
    } ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};

export default getTimeDifference;
