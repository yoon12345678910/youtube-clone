import moment from 'moment';


function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now';
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago';
  } else if (elapsed < milliSecondsPerHour) {
    let d = Math.round(elapsed / milliSecondsPerMinute)
    if (d === 1) return d + ' minute ago';
    return d + ' minutes ago';
  } else if (elapsed < milliSecondsPerDay) {
    let d = Math.round(elapsed / milliSecondsPerHour)
    if (d === 1) return d + ' hour ago';
    return d + ' hours ago';
  } else if (elapsed < milliSecondsPerMonth) {
    let d = Math.round(elapsed / milliSecondsPerDay)
    if (d === 1) return d + ' day ago';
    return d + ' days ago';
  } else if (elapsed < milliSecondsPerYear) {
    let d = Math.round(elapsed / milliSecondsPerMonth)
    if (d === 1) return d + ' month ago';
    return d + ' months ago';
  } else {
    let d = Math.round(elapsed / milliSecondsPerYear);
    if (d === 1) return d + ' year ago';
    return d + ' years ago';
  }
};

export function timeDifferenceForDate(date) {
  const now = new Date().getTime();
  const updated = new Date(parseInt(date)).getTime();
  return timeDifference(now, updated);
};

export const formatFilename = name => {
  name = name.toLowerCase();
  const date = moment().format('M-DD-YYYY');
  return {
    title: name.split('.')[0].replace(/[^a-z0-9]/g, '_'),
    uploadFileName: `${date}-${name.replace(/[^a-z0-9]/g, '-')}`
  };
};