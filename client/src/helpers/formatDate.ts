export default function formatDate(dateString: string): string {
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );

  const date = new Date(dateString);



  // if (isNaN(date.getTime())) {
  //   return "Неверный формат даты";
  // }

  const messageDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const isToday = +messageDate === +today;
  const isYesterday = +messageDate === +yesterday;

  const formattedTodayDate = new Intl.DateTimeFormat("ru", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  const formattedDate = new Intl.DateTimeFormat("ru", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);

  

  if (isToday) {
    return formattedTodayDate;
  } else if (isYesterday) {
    return "Вчера";
  } else {
    return formattedDate;
  }
}

