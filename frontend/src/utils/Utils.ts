export const dateToTimeString = (date: Date | string) => {
    if(typeof date === "string") date = new Date(date)
    return `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}:${date.getSeconds().toString().padStart(2,'0')}`
  }

export const dateToDateString = (date: Date | string) => {
    if(typeof date === "string") date = new Date(date)
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const today = new Date();

    // Compare the year, month, and day of the two dates
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return "Today";
    } else if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate() - 1 &&
      date.getTime() >= today.getTime() - oneDay &&
      date.getTime() < today.getTime()
    ) {
      return "Yesterday";
    } 
    else return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
  }