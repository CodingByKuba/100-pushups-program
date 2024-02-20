const models = require("../models");
const errors = require("../data/errors");
const { countStageUnlocked, countBreakInDays } = require("../data/utils");

const finishSeries = async (props) => {
  try {
    let email = props.user.email;

    if (!email) throw errors.EMAIL_REQUIRED;

    let findUser = await models.Account.findOne({ email: email });
    if (!findUser) throw errors.EMAIL_NOT_FOUND;

    if (findUser.seriesLock && new Date(findUser.seriesLock) - new Date() > 0)
      throw errors.SERIES_LOCK_DATE_INCORRECT;

    if (!props.seriesId) throw errors.SERIES_ID_REQUIRED;

    let findSeries = await models.Series.findOne({
      accountId: findUser._id,
      seriesId: props.seriesId,
    });
    if (!findSeries) throw errors.SERIES_NOT_FOUND;

    let findStage = await models.Stage.findOne({
      accountId: findUser._id,
      stageId: findSeries.dedicatedForStage,
    });
    if (!findStage) throw errors.STAGE_NOT_FOUND;

    if (findUser.currentStage !== findStage.stageId)
      throw errors.STAGE_ID_INCORRECT;

    if (findSeries.seriesToMake.length === findSeries.seriesFinished.length)
      throw errors.SERIES_IS_FINISHED;
    if (findStage.finished) throw errors.STAGE_IS_FINISHED;

    if (!props?.seriesFinished) throw errors.SERIES_FINISHED_REQUIRED;
    if (
      !Array.isArray(props.seriesFinished) ||
      props.seriesFinished.some((el) => isNaN(el)) ||
      props.seriesFinished.length !== findSeries.seriesToMake.length
    )
      throw errors.SERIES_FINISHED_INCORRECT;

    let findAllSeriesInStage = await models.Series.find({
      accountId: findUser._id,
      dedicatedForStage: findStage.stageId,
    });

    if (
      findAllSeriesInStage.some(
        (el) =>
          el.seriesToMake.length !== el.seriesFinished.length &&
          el.seriesIndex < findSeries.seriesIndex
      )
    )
      throw errors.SERIES_FINISHED_INCORRECT;

    let updatedSeries = await models.Series.updateOne(
      { accountId: findUser._id, seriesId: props.seriesId },
      { seriesFinished: props.seriesFinished },
      { new: true }
    );

    let updatedStage = undefined;

    let filterSeries =
      findAllSeriesInStage.filter(
        (el) => el.seriesToMake.length !== el.seriesFinished.length
      ).length === 1;

    let isTestNeeded = findStage.stageLevel && filterSeries ? true : false;

    let countNewStage = countStageUnlocked(props.seriesFinished[0]);
    let newStageUnlocked =
      findStage.stageLevel < 1 && countNewStage > findUser.stageUnlocked
        ? countNewStage
        : undefined;

    let countNewBreakInDays = countBreakInDays(findSeries.breakInDays);

    if (countBreakInDays) {
      await models.Account.updateOne(
        { email: email },
        {
          seriesLock: countNewBreakInDays,
        },
        { new: true }
      );
    }

    if (filterSeries) {
      updatedStage = await models.Stage.updateOne(
        { accountId: findUser._id, stageId: findSeries.dedicatedForStage },
        { finished: true },
        { new: true }
      );
      await models.Account.updateOne(
        { email: email },
        {
          currentStage: "",
          testNeeded: isTestNeeded,
          stageUnlocked: newStageUnlocked
            ? newStageUnlocked
            : findUser.stageUnlocked,
        },
        { new: true }
      );
    }

    return {
      finishedSeries: updatedSeries && {
        seriesId: findSeries.seriesId,
        series: props.seriesFinished,
      },
      finishedStage: updatedStage ? findStage.stageId : undefined,
      testNeeded: isTestNeeded,
      stageUnlocked: newStageUnlocked,
      seriesLock: countNewBreakInDays,
    };
  } catch (error) {
    return { error: error };
  }
};

module.exports = {
  finishSeries,
};
