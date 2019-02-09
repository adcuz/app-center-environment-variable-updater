const axios = require("axios");

const url = path => `https://api.appcenter.ms/v0.1${path}`;
const e = v => encodeURIComponent(v);

module.exports.default = (apiKey, ownerName, appName) => {
  const buildConf = ({ headers, ...conf }) => ({
    headers: {
      "X-API-Token": apiKey,
      ...headers
    },
    ...conf
  });

  const get = (url, conf = {}) => axios.get(url, buildConf(conf));
  const post = (url, data, conf = {}) => axios.post(url, data, buildConf(conf));
  const put = (url, data, conf = {}) => axios.put(url, data, buildConf(conf));

  return {
    getBranchConfig: branch =>
      get(
        url(`/apps/${e(ownerName)}/${e(appName)}/branches/${e(branch)}/config`)
      ),
    putBranchConfig: (branch, data) =>
      put(
        url(`/apps/${e(ownerName)}/${e(appName)}/branches/${e(branch)}/config`),
        data
      )
  };
};
