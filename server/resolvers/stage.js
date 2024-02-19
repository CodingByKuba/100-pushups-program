const models = require("../models");
const errors = require("../data/errors");
const { generateRandomId, getSeriesArray } = require("../data/utils");

const createStage = async (props) => {
  try {
    let email = props.user.email;

    if (!email) throw errors.EMAIL_REQUIRED;

    let findUser = await models.Account.findOne({ email: email });
    if (!findUser) throw errors.EMAIL_NOT_FOUND;

    if (findUser.currentStage) throw errors.STAGE_STARTED;
    if (!props?.stageLevel || props.stageLevel < 0 || isNaN(props.stageLevel))
      props.stageLevel = 0;
    if (props.stageLevel > findUser.stageUnlocked)
      throw errors.STAGE_LEVEL_INCORRECT;

    if (findUser.testNeeded && props.stageLevel > 0)
      throw errors.STAGE_LEVEL_INCORRECT;

    if (!findUser.testNeeded && props.stageLevel < 1)
      throw errors.STAGE_LEVEL_INCORRECT;

    let stageId = generateRandomId();
    let seriesArray = getSeriesArray(findUser._id, stageId, props.stageLevel);

    let newStage = await models.Stage.create({
      accountId: findUser._id,
      stageId: stageId,
      stageLevel: props.stageLevel,
      series: seriesArray.map((el) => el.seriesId),
    });

    if (!newStage) throw errors.CREATE_STAGE_ERROR;

    let newSeries = await models.Series.insertMany(seriesArray);

    await models.Account.updateOne(
      { email: email },
      { currentStage: stageId },
      { new: true }
    );

    return {
      stage: newStage,
      series: newSeries,
    };
  } catch (error) {
    return { error: error };
  }
};

const deleteStage = async (props) => {
  try {
    let email = props.user.email;

    if (!email) throw errors.EMAIL_REQUIRED;

    let findUser = await models.Account.findOne({ email: email });
    if (!findUser) throw errors.EMAIL_NOT_FOUND;

    if (!props?.stageId) throw errors.STAGE_ID_REQUIRED;
    let findStage = await models.Stage.findOne({ stageId: props.stageId });

    if (!findStage) throw errors.STAGE_NOT_FOUND;

    if (String(findUser._id) !== String(findStage.accountId))
      throw errors.AUTHENTICATION_ERROR;

    if (findUser.currentStage !== findStage.stageId)
      throw errors.STAGE_ID_INCORRECT;

    await models.Stage.deleteOne({
      accountId: findUser._id,
      stageId: props.stageId,
    });
    await models.Series.deleteMany({
      accountId: findUser._id,
      dedicatedForStage: props.stageId,
    });
    await models.Account.updateOne(
      { email: email },
      { currentStage: "" },
      { new: true }
    );

    return {
      deletedStage: findStage.stageId,
      deletedSeries: findStage.series,
    };
  } catch (error) {
    return { error: error };
  }
};

module.exports = {
  createStage,
  deleteStage,
};
