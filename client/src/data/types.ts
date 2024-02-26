export type UserInitialStateType = {
  authToken: string;
  email: string;
  lastLogin: undefined | Date;
  createdAt: undefined | Date;
  updatedAt: undefined | Date;
};

export type StageLevelType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13;

export type TrainingInitialStateType = {
  stageUnlocked: StageLevelType;
  testNeeded: boolean;
  seriesLock: undefined | Date;
  currentStage: string;
  stages: StageType[];
  series: SeriesType[];
};

export type StageType = {
  stageId: string;
  stageLevel: StageLevelType;
  series: string[];
  finished: boolean;
  createdAt: undefined | Date;
  updatedAt: undefined | Date;
};

export type SeriesType = {
  seriesId: string;
  dedicatedForStage: Pick<StageType, "stageId">;
  seriesIndex: number;
  seriesToMake: number[];
  seriesFinished: number[];
  breakInDays: number;
  breakInSeconds: number;
  createdAt: undefined | Date;
  updatedAt: undefined | Date;
};

export type ActionType = {
  type: number;
  payload: any;
};

export type FetchContextType = {
  isPending: boolean;
  fetchCallback: (data?: any) => void;
};

export type FetchCallbackArguments = {
  url: string;
  method: string;
  timeout: number;
  payload: any;
  successCallback: (arg: any) => void;
  errorCallback: (arg: any) => void;
};
