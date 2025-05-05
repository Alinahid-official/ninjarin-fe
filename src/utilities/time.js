import dayjs from "dayjs";
import moment from "moment";

export const STANDARD_DATE_FORMAT = "DD-MM-YYYY";
export const STANDARD_DATE_FORMAT_2 = "DD MMMM YYYY";
export const STANDARD_DATE_HR_MIN_SEC_FORMAT = "DD-MM-YYYY hh:mm:ss A";
export const STANDARD_DATE_TIME_FORMAT = "DD-MM-YYYY hh:mm A";
export const WEATHER_TIME = "DD-MM-YYYY, hh:mm A";
export const LONG_DATE_FORMAT = "MMMM Do YYYY";

export const getDateInFormat = (date, format) => {
  return moment(new Date(date)).format(format);
};

export const getDateInStandardFormat = (date) => {
  return getDateInFormat(date, STANDARD_DATE_FORMAT);
};

export const getDateTimeInStandardFormat = (date) => {
  // AM PM format
  return moment(new Date(date)).format("DD-MM-YYYY hh:mm A");
};

export const checkDueDateIsClose = (dueDate) => {
  const today = moment();
  const due = moment(dueDate);
  const diff = due.diff(today, "days");
  return diff <= 3;
};

export const getDayFromTimeStamp = (timestamp) => {
  return dayjs.unix(timestamp).format("ddd");
};

export const getDateFromTimeStamp = (timestamp) => {
  return dayjs.unix(timestamp).format("DD MMM");
};

export const convertDayJsDateToMilliSeconds = (date) => {
  return new Date(dayjs(date).format()).getTime();
};

export const convertDayToMilliSeconds = (date) => {
  return new Date(date).getTime();
};

export const convertMilliSecondsToDate = (timestamp) => {
  const formattedDate = moment(timestamp).format("DD/MM/YYYY");
  return formattedDate;
};

export function isWithinTenPercent(
  startDate,
  endDate,
  currentDate = moment().utc().format()
) {
  const start = moment.utc(startDate);
  const end = moment.utc(endDate);
  const current = moment.utc(currentDate);

  const startLocal = start.local();
  const endLocal = end.local();
  const currentLocal = current.local();

  const totalTimeDifference = endLocal.diff(startLocal);
  const tenPercentOfTotalTime = totalTimeDifference * 0.1;
  const remainingTime = endLocal.diff(currentLocal);

  return remainingTime <= tenPercentOfTotalTime;
}

export const getBackDate = (days) => {
  const dateFormat = "YYYY-MM-DD";
  return dayjs(
    moment().subtract(days, "days").format("YYYY-MM-DD"),
    dateFormat
  );
};

export const isDateLessThanXDays = (date, days) => {
  const givenDate = moment(date);
  const dateXDaysBack = moment().subtract(days, "days");
  const isNotLessThanXDays = givenDate.isAfter(dateXDaysBack);
  return isNotLessThanXDays;
};

export const calculateInAgo = (date) => {
  return moment(date).fromNow();
};

export function isDatePercentageCompleted(
  startDate,
  daysCount,
  currentDate,
  percentage
) {
  const targetDays = Math.ceil((daysCount * percentage) / 100);
  const start = new Date(startDate);
  const targetDate = new Date(start);
  targetDate.setDate(start.getDate() + targetDays);
  const current = new Date(currentDate);
  return current >= targetDate;
}

export function getPercentageTargetDate(startDate, daysCount, percentage) {
  const targetDays = Math.ceil((daysCount * percentage) / 100);
  const start = new Date(startDate);
  const targetDate = new Date(start);
  targetDate.setDate(start.getDate() + targetDays);
  return targetDate;
}

export function convertSeconds(totalSeconds) {
  // Calculate hours
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSecondsAfterHours = totalSeconds % 3600;

  // Calculate minutes
  const minutes = Math.floor(remainingSecondsAfterHours / 60);

  // Calculate remaining seconds
  const seconds = remainingSecondsAfterHours % 60;

  return {
    hours,
    minutes,
    seconds
  };
}