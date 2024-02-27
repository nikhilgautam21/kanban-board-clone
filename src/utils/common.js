import {
  GROUPING_OPTIONS,
  PRIORITY_LABEL_MAPPER,
  SORTING_OPTONS,
} from "../config";

export const getGroupedTicketByType = (ticketsData, groupType, sortType) => {
  console.log(ticketsData, "tickets in groupedby");
  const { STATUS, USER, PRIORITY } = GROUPING_OPTIONS;
  const { TITLE, PRIORITY: SORTING_PRIORITY } = SORTING_OPTONS;
  const { tickets, users } = ticketsData;

  let grouped = [];
  switch (groupType) {
    case STATUS:
      grouped = tickets.reduce((acc, ticket) => {
        const status = ticket.status;
        acc[status] = acc[status] || [];
        acc[status].push({
          ...ticket,
          user: users.find((user) => user.id === ticket.userId),
        });
        return acc;
      }, {});
      break;
    case USER:
      grouped = tickets.reduce((acc, ticket) => {
        const userId = ticket.userId;
        acc[userId] = acc[userId] || [];
        acc[userId].push({
          ...ticket,
          user: users.find((user) => user.id === userId),
        });
        return acc;
      }, {});
      break;
    case PRIORITY:
      grouped = tickets.reduce((acc, ticket) => {
        const priority = ticket.priority;
        acc[priority] = acc[priority] || [];
        acc[priority].push({
          ...ticket,
          user: users.find((user) => user.id === ticket.userId),
        });
        return acc;
      }, {});
      break;
    default:
      break;
  }

  const sortedGroupedTickets = { ...grouped };

  console.log(grouped, "GROUPED");

  // If both groupType and sortType are priority, sort by descending order of priority
  if (groupType === PRIORITY && sortType === SORTING_PRIORITY) {
    const sortedData = {};
    [...Object.keys(sortedGroupedTickets)]
      .sort((a, b) => b - a)
      .forEach((key) => {
        sortedData[key] = sortedGroupedTickets[key];
      });
    return sortedData
  } else {
    // Otherwise, sort according to the given sortType
    Object.keys(sortedGroupedTickets).forEach((groupKey) => {
      sortedGroupedTickets[groupKey].sort((a, b) => {
        if (sortType === SORTING_PRIORITY) {
          return b.priority - a.priority;
        } else if (sortType === TITLE) {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });

    return sortedGroupedTickets;
  }
};

export const createDropdownOptions = (data) => {
  return data.map((item) => {
    return { value: item, label: item };
  });
};

export const getColumnLabel = (groupingOption, groupKey, ticketsData) => {
  console.log(groupingOption, groupKey, ticketsData, "COlumnLabel");
  const { USER, PRIORITY } = GROUPING_OPTIONS;
  switch (groupingOption) {
    case USER:
      return getUserByUserId(ticketsData, groupKey);
    case PRIORITY:
      return PRIORITY_LABEL_MAPPER[groupKey];
    default:
      return groupKey;
  }
};

const getUserByUserId = (ticketsData, userId) => {
  return ticketsData.users.find((u) => u.id === userId)?.name;
};

export function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const randomColor = () => Math.floor(Math.random() * 256);
  const color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  return color;
}
