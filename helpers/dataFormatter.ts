const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
};

const dateOnlyOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
};

export const dateFormatter = (date: Date | undefined) =>
  new Intl.DateTimeFormat(undefined, options).format(date);

export const daysDifference = (timeDifference: number) =>
  Math.floor(timeDifference / (1000 * 60 * 60 * 24));

export const dateOnlyFormatter = (date: Date | undefined) =>
  new Intl.DateTimeFormat(undefined, dateOnlyOptions).format(date);
