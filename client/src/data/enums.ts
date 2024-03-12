export enum UserReducerActions {
  SET_AUTH_TOKEN,
  SET_EMAIL,
  SET_LAST_LOGIN,
  SET_CREATED_AT,
  SET_UPDATED_AT,
  RESET,
}

export enum TrainingReducerActions {
  SET_STAGE_UNLOCKED,
  SET_TEST_NEEDED,
  SET_SERIES_LOCK,
  SET_CURRENT_STAGE,
  CREATE_STAGE,
  DELETE_STAGE,
  FINISH_SERIES,
}

export enum LocalStorageMemory {
  AUTH_TOKEN = "app-auth-token",
  EMAIL = "app-email",
  PASSWORD = "app-password",
  PASSWORD_REMEMBER = "app-password-remember",
  AUTO_LOGIN = "app-auto-login",
}

export enum BrowserRoutes {
  START = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  ACCOUNT = "/account",
  ANY = "*",
}
