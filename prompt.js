require("dotenv").config();
const inquirer = require("inquirer");
const dotenv = require("dotenv");

module.exports.default = async () => {
  var questions = [];

  if (!process.env.MS_AS_ENV) {
    questions.push({
      type: "editor",
      name: "env",
      message:
        "Please paste your env file! Auto-configured by setting the MS_AS_ENV environment variable.",
      validate: function(value) {
        if (!value) {
          return false;
        }

        return true;
      }
    });
  }

  if (!process.env.MS_AS_API_KEY) {
    questions.push({
      type: "input",
      name: "api_key",
      message:
        "Please enter an MS App Center API key will full write access. Auto-configured by setting the MS_AS_API_KEY environment variable.",
      validate: function(token) {
        if (!token) {
          return false;
        }

        return true;
      }
    });
  }

  if (!process.env.MS_AS_OWNER_NAME) {
    questions.push({
      type: "input",
      name: "owner_name",
      message:
        "Please enter an MS App Center App owner-name: `https://appcenter.ms/orgs/{owner-name}/apps/{app-name}`. Auto-configured by setting the MS_AS_OWNER_NAME environment variable.",
      validate: function(value) {
        if (!value) {
          return false;
        }

        return true;
      }
    });
  }

  if (!process.env.MS_AS_APP_NAME) {
    questions.push({
      type: "input",
      name: "app_name",
      message:
        "Please enter an MS App Center App app-name: `https://appcenter.ms/orgs/{owner-name}/apps/{app-name}`. Auto-configured by setting the MS_AS_APP_NAME environment variable.",
      validate: function(value) {
        if (!value) {
          return false;
        }

        return true;
      }
    });
  }

  if (!process.env.MS_AS_APP_BRANCH) {
    questions.push({
      type: "input",
      name: "branch",
      message:
        "Please enter the branch name. Auto-configured by setting the MS_AS_APP_BRANCH environment variable.",
      validate: function(value) {
        if (!value) {
          return false;
        }

        return true;
      }
    });
  }

  if (!process.env.hasOwnProperty("MS_AS_REPLACE_ENV")) {
    questions.push({
      type: "confirm",
      name: "replace_env",
      default: false,
      message:
        "Do you want to remove any existing Environment Variables for this branch? Enter no if you want to keep and overwrite existing."
    });
  }

  const answers = await inquirer.prompt(questions);

  const conf = {
    env: process.env.MS_AS_ENV,
    api_key: process.env.MS_AS_API_KEY,
    owner_name: process.env.MS_AS_OWNER_NAME,
    app_name: process.env.MS_AS_APP_NAME,
    branch: process.env.MS_AS_APP_BRANCH,
    replace_env: process.env.MS_AS_REPLACE_ENV === "true",
    ...answers
  };

  const parsedEnv = dotenv.parse(conf.env);

  if (typeof parsedEnv !== "object") {
    throw Error(
      "Something went wrong when trying to parse the values of your AS env vars :("
    );
  }

  if (Object.keys(parsedEnv).length === 0) {
    throw Error("Did not find any values in your provided AS env vars");
  }

  conf.env = parsedEnv;

  return conf;
};
