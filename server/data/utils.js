const stages = require("./stages");

const generateRandomId = () =>
  new Date().getTime().toString() +
  Math.floor(Math.random() * 899999 + 100000).toString();

const getSeriesArray = (userId, stageId, stageLevel) => {
  let seriesArray = [];
  if (!userId || !stageId || stageLevel < 0 || stageLevel > 13) return [];
  stages[stageLevel || 0].map((el, index) =>
    seriesArray.push({
      accountId: userId,
      seriesId: generateRandomId(),
      seriesIndex: index,
      dedicatedForStage: stageId,
      seriesToMake: el.series,
      seriesFinished: [],
      breakInSeconds: el.breakInSeconds,
      breakInDays: el.breakInDays,
    })
  );

  return seriesArray;
};

const countStageUnlocked = (pushups) => {
  if (isNaN(pushups) || pushups < 0) return 0;
  let advanceArray = [0, 6, 11, 21, 26, 31, 36, 41, 46, 51, 56, 61, 100];
  let i = 0;
  let newStage = 1;
  while (i < pushups) {
    i++;
    if (advanceArray.includes(i)) newStage++;
  }
  return newStage;
};

const countBreakInDays = (breakInDays) => {
  if (isNaN(breakInDays) || breakInDays < 0) return undefined;
  let date = new Date();
  date.setDate(date.getDate() + 1 + breakInDays);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
};

module.exports = {
  generateRandomId,
  getSeriesArray,
  countStageUnlocked,
  countBreakInDays,
};
