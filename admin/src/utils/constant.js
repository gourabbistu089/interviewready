export function formatDate(isoString) {
  const date = new Date(isoString);

  // Month names
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = date.getUTCDate(); // day of month
  const month = months[date.getUTCMonth()]; // month short name
  const year = date.getUTCFullYear(); // year

  return `${day} ${month}, ${year}`;
}

export const topicStats = (topicDatas) => {
  const result = [];
  const topicsGroupSameDate = {};

  topicDatas.forEach((topicData) => {
    const date = formatDate(topicData.createdAt);
    if (topicsGroupSameDate[date]) {
      topicsGroupSameDate[date].push(topicData);
    } else {
      topicsGroupSameDate[date] = [topicData];
    }
  });

  Object.keys(topicsGroupSameDate).forEach((date) => {
    result.push({
      date,
      count: topicsGroupSameDate[date].length
    });
  });

  return result;
}
