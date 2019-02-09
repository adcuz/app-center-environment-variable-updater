const setup = require("./prompt").default;
const configureApi = require("./api").default;

setup()
  .then(async conf => {
    console.log("Config: ", JSON.stringify(conf, null, "  "));

    const api = configureApi(conf.api_key, conf.owner_name, conf.app_name);

    const {
      data: {
        environmentVariables: originalEnvironmentVariables,
        ...originalBranchConfResponse
      }
    } = await api.getBranchConfig(conf.branch);

    const newEnvs = [];
    Object.keys(conf.env).forEach(key =>
      newEnvs.push({
        name: key,
        value: conf.env[key]
      })
    );

    const newBranchConfigData = {
      ...originalBranchConfResponse,
      environmentVariables: []
        .concat(conf.replace_env ? [] : originalEnvironmentVariables)
        .concat(newEnvs)
    };

    const {
      data: { environmentVariables: newEnvironmentVariables }
    } = await api.putBranchConfig(conf.branch, newBranchConfigData);

    console.info("New Environment Variables:");
    console.info(JSON.stringify(newEnvironmentVariables, null, "  "));
  })
  .catch(e => console.error(e));
