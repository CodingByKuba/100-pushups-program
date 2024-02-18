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

module.exports = {
  generateRandomId,
  getSeriesArray,
};
