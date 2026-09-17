export function removeTags(str) {
  if (str === null || str === '') return false;
  str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, '');
}

export function cutText(str) {
  if (str === null || str === '') {
    return false;
  }
  const splitStr = str.split(' ');
  if (!(splitStr.length > 15)) {
    return str;
  }
  splitStr.splice(15);
  const newText = splitStr.map((string) => string.concat(' '));
  return newText.concat('.....');
}

export function parseDate(date) {
  const now = new Date();
  const createdAt = new Date(date);
  const different = now - createdAt;
  const sec = Math.floor(different / 1000);
  const minute = Math.floor(different / (1000 * 60));
  const hour = Math.floor(different / (1000 * 3600));
  const day = Math.floor(different / (1000 * 3600 * 24));
  if (day > 0) {
    return `${day} Day Ago`;
  }
  if (hour > 0) {
    return `${hour} Hour Ago`;
  }
  if (minute > 0) {
    return `${minute} Minute Ago`;
  }
  if (sec > 0) {
    return `${sec} Sec Ago`;
  }
  return 'just now';
}

export function getTotalVote(votedBy) {
  if (votedBy === undefined || votedBy === null) {
    return [];
  }
  return votedBy.length;
}
