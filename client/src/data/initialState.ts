import { TrainingInitialStateType, UserInitialStateType } from "./types";

export const userInitialState: UserInitialStateType = {
  authToken: "",
  email: "",
  lastLogin: undefined,
  createdAt: undefined,
  updatedAt: undefined,
};

export const trainingInitialState: TrainingInitialStateType = {
  stageUnlocked: 0,
  testNeeded: true,
  seriesLock: undefined,
  currentStage: "",
  stages: [],
  series: [],
};
