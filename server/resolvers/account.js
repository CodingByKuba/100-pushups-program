const bcrypt = require("bcrypt");
const models = require("../models");
const jwt = require("jsonwebtoken");
const errors = require("../data/errors");

const signIn = async (props) => {
  try {
    if (!props?.email) throw errors.EMAIL_REQUIRED;

    let findUser = await models.Account.findOne({ email: props.email }).select(
      "+password"
    );
    if (!findUser) throw errors.EMAIL_NOT_FOUND;

    if (!props?.password) throw errors.PASSWORD_REQUIRED;

    let comparedPassword = await bcrypt.compare(
      props.password,
      findUser.password
    );

    if (!comparedPassword) throw errors.PASSWORD_INCORRECT;

    let lastLogin = new Date();

    let accessToken = jwt.sign(
      { email: props.email },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );

    await models.Account.updateOne(
      { email: findUser.email },
      { lastLogin: lastLogin }
    );

    return {
      token: accessToken,
    };
  } catch (error) {
    return { error: error };
  }
};

const createAccount = async (props) => {
  try {
    if (!props?.email) throw errors.EMAIL_REQUIRED;
    if (!props?.password) throw errors.PASSWORD_REQUIRED;
    if (!props?.repeatPassword) throw errors.REPEAT_PASSWORD_REQUIRED;
    if (!props.email.includes("@") || !props.email.includes("."))
      throw errors.EMAIL_INCORRECT;
    if (props.password.length < 8) throw errors.PASSWORD_INCORRECT;
    if (props.password !== props.repeatPassword)
      throw errors.REPEAT_PASSWORD_INCORRECT;

    let findEmail = await models.Account.find({ email: props.email });
    if (findEmail.length > 0) throw errors.EMAIL_EXISTS;
    let hashedPassword = await bcrypt.hash(props.password, 10);

    let newUser = await models.Account.create({
      email: props.email,
      password: hashedPassword,
    });
    newUser.password = undefined;
    return newUser;
  } catch (error) {
    return { error: error };
  }
};

const getUser = async (props) =>
  await models.Account.findOne({ email: props.user.email });

const refreshToken = async (props) => {
  try {
    if (!props.token || typeof props.token !== "string")
      throw errors.TOKEN_REQUIRED;
    await models.RevokedToken.create({
      authToken: props.token,
    });

    let accessToken = jwt.sign(
      { email: props.user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return {
      token: accessToken,
    };
  } catch (error) {
    return { error: error };
  }
};

const updateAccount = async (props) => {
  const email = props.user.email;

  try {
    if (props.password || props.newPassword || props.repeatNewPassword) {
      if (!props.password) throw errors.PASSWORD_REQUIRED;
      if (!props.newPassword) throw errors.NEW_PASSWORD_REQUIRED;
      if (!props.repeatNewPassword) throw errors.REPEAT_PASSWORD_REQUIRED;
      if (props.password.length < 8) throw errors.PASSWORD_INCORRECT;
      if (props.newPassword !== props.repeatNewPassword)
        throw errors.REPEAT_PASSWORD_INCORRECT;
      if (props.password === props.newPassword)
        throw errors.NEW_PASSWORD_SAME_AS_OLD;

      let hashedPassword = await bcrypt.hash(props.password, 10);

      let updatedAccount = await models.Account.findOneAndUpdate(
        { email: email },
        { password: hashedPassword },
        { new: true }
      );

      return { updatedPassword: updatedAccount ? true : false };
    }
  } catch (error) {
    return { error: error };
  }
};

const signOut = async (props) => {
  try {
    if (!props.token || typeof props.token !== "string")
      throw errors.TOKEN_REQUIRED;
    return await models.RevokedToken.create({
      authToken: props.token,
    });
  } catch (error) {
    return { error: error };
  }
};

module.exports = {
  signIn,
  createAccount,
  getUser,
  refreshToken,
  updateAccount,
  signOut,
};
