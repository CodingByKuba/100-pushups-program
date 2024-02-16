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

    if (comparedPassword) {
      let accessToken = jwt.sign(
        { email: props.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return {
        token: accessToken,
      };
    } else {
      throw errors.PASSWORD_INCORRECT;
    }
  } catch (error) {
    return { error: error };
  }
};

const createAccount = async (props) => {
  try {
    if (!props?.email) throw errors.EMAIL_REQUIRED;
    if (!props?.password) throw errors.PASSWORD_REQUIRED;
    if (!props.email.includes("@") || !props.email.includes("."))
      throw errors.EMAIL_INCORRECT;
    if (props.password.length < 8) throw errors.PASSWORD_INCORRECT;

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

module.exports = {
  signIn,
  createAccount,
  refreshToken,
};
