// @ts-expect-error: moment-jalaali doesn't have proper types
import moment from "moment-jalaali";
moment.locale("fa");

export const useJalaliDate = () => {
  // Format a date to Jalali calendar
  const formatJalali = (
    date: Date | string,
    format: string = "jYYYY/jMM/jDD"
  ) => {
    return moment(date).format(format);
  };

  // Get current Jalali date
  const getCurrentJalaliDate = (format: string = "jYYYY/jMM/jDD") => {
    return moment().format(format);
  };

  // Parse Jalali date string
  const parseJalali = (
    dateString: string,
    format: string = "jYYYY/jMM/jDD"
  ) => {
    return moment(dateString, format);
  };

  // Format with Persian month name
  const formatJalaliWithPersianMonth = (date: Date | string) => {
    return moment(date).format("jYYYY/jMM/jDD dddd");
  };

  // Get Jalali date with time
  const formatJalaliDateTime = (date: Date | string) => {
    return moment(date).format("jYYYY/jMM/jDD HH:mm:ss");
  };

  // Convert Gregorian to Jalali
  const gregorianToJalali = (
    date: Date | string,
    format: string = "jYYYY/jMM/jDD"
  ) => {
    return moment(date).format(format);
  };

  // Get date range in Jalali
  const getJalaliDateRange = (
    startDate: Date | string,
    endDate: Date | string,
    format: string = "jYYYY/jMM/jDD"
  ) => {
    return {
      start: moment(startDate).format(format),
      end: moment(endDate).format(format),
    };
  };

  return {
    formatJalali,
    getCurrentJalaliDate,
    parseJalali,
    formatJalaliWithPersianMonth,
    formatJalaliDateTime,
    gregorianToJalali,
    getJalaliDateRange,
  };
};
