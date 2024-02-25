import { TrainingReducerActions } from "../data/enums";
import { trainingInitialState } from "../data/initialState";
import {
  ActionType,
  SeriesType,
  StageLevelType,
  StageType,
  TrainingInitialStateType,
} from "../data/types";

type CreateStagePayloadType = {
  stage: StageType;
  series: SeriesType[];
};

const trainingReducer = (
  state: TrainingInitialStateType = trainingInitialState,
  action: ActionType
) => {
  switch (action.type) {
    case TrainingReducerActions.SET_STAGE_UNLOCKED:
      return {
        ...state,
        stageUnlocked: (action.payload as StageLevelType) ? action.payload : 0,
      };
    case TrainingReducerActions.SET_TEST_NEEDED:
      return {
        ...state,
        testNeeded: (action.payload as boolean)
          ? action.payload
          : !state.testNeeded,
      };
    case TrainingReducerActions.SET_CURRENT_STAGE:
      return {
        ...state,
        currentStage: (action.payload as string) ? action.payload : "",
      };
    case TrainingReducerActions.SET_SERIES_LOCK:
      return {
        ...state,
        seriesLock: (action.payload as Date) ? action.payload : undefined,
      };
    case TrainingReducerActions.CREATE_STAGE:
      return (action.payload as CreateStagePayloadType)
        ? {
            ...state,
            currentStage: action.payload?.stage.stageId,
            stages: (action.payload?.stage as StageType)
              ? [...state.stages, action.payload.stage]
              : state.stages,
            series: (action.payload?.series as SeriesType[])
              ? [...state.series, ...action.payload.series]
              : state.series,
          }
        : state;
    case TrainingReducerActions.DELETE_STAGE:
      return (action.payload as string)
        ? {
            ...state,
            currentStage: "",
            stages: state.stages.filter(
              (el: StageType) => el.stageId !== action.payload
            ),
            series: state.series.filter(
              (el: SeriesType) => el.dedicatedForStage !== action.payload
            ),
          }
        : state;
    case TrainingReducerActions.FINISH_SERIES:
      if (!action.payload) return state;
      let findStageIndex = state.stages.findIndex(
        (el: StageType) => el.stageId === action.payload
      );
      let findSeriesIndex = state.series.findIndex(
        (el: SeriesType) => el.dedicatedForStage === action.payload
      );
      if (!state.stages[findStageIndex] || !state.series[findSeriesIndex])
        return state;
      //TODO
      return state;
    default:
      return state;
  }
};

export default trainingReducer;
