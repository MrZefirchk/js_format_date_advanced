'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function convertYear(year, fromFormat, toFormat) {
  if (
    (fromFormat.length === 2 && toFormat.length === 2) ||
    (fromFormat.length === 4 && toFormat.length === 4)
  ) {
    return year;
  }

  if (fromFormat.length === 4 && toFormat.length === 2) {
    return year.slice(year.length - 2);
  }

  return year < 30 ? '20'.concat(year) : '19'.concat(year);
}

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(fromSeparator);
  const fromFormatParts = fromFormat.slice(0, fromFormat.length - 1);
  const fromFormatObj = fromFormatParts.reduce((previous, current, index) => {
    return {
      ...previous,
      [current]: dateParts[index],
    };
  }, {});

  const yearFromFormat = fromFormatParts.find((format) => format.includes('Y'));

  const toSeparator = toFormat[toFormat.length - 1];
  const toFormatParts = toFormat.slice(0, toFormat.length - 1);

  return toFormatParts
    .reduce((prevDateParts, currentPartFormat) => {
      const isYear = currentPartFormat.includes('Y');
      const year = convertYear(
        fromFormatObj[yearFromFormat],
        yearFromFormat,
        currentPartFormat,
      );
      const datePart = isYear ? year : fromFormatObj[currentPartFormat];

      return [...prevDateParts, datePart];
    }, [])
    .join(toSeparator);
}

module.exports = formatDate;
