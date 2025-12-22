export const humanizeKey = (key) =>
  key &&
  key
    .replace(/_{2,}/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

export const formatDateTimeEnglish = (utcTimestamp) => {
  const utcDate = new Date(utcTimestamp);
  if (
    utcDate
      .toLocaleTimeString("en-US", { timeZoneName: "short" })
      .split(" ")[0] ===
    new Date()
      .toLocaleTimeString("en-US", { timeZoneName: "short" })
      .split(" ")[0]
  ) {
    return utcDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } else {
    const timeZoneOffset = 5 * 60 * 60 * 1000;
    const localTimestamp = utcDate.getTime() + timeZoneOffset;
    const localDate = new Date(localTimestamp);

    return localDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }
};

export function formatSecondsToHHMMSS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const padded = (num) => String(num).padStart(2, "0");

  return `${padded(hours)}:${padded(minutes)}:${padded(seconds)}`;
}

export function formatToPDT(isoString) {
  const date = new Date(isoString);

  const pdtFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles", // Handles PST/PDT automatically
    year: "numeric",
    month: "short", // "Sep"
    day: "2-digit", // "01"
    hour: "2-digit", // "07"
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // 12-hour clock
  });

  return pdtFormatter.format(date);
}

export function formateToLA(isoString) {
  const date = new Date(isoString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short", // Sep
    day: "2-digit", // 17
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles", // ✅ Los Angeles time
  });
}

export const isWithin90 = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.abs(now - d) / (1000 * 60 * 60 * 24);
  return diff <= 90;
};

export const RemoveFromSelect = (item, selectedList, setselectedList) => {
  let temp = [...selectedList];
  temp = temp.filter((items) => items != item);
  setselectedList(temp);
};
