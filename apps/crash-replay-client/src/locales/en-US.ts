let platform = {};
try {
  platform = require(`./en-US/index.json`);
} catch (e) {}
export default {
  ...platform,
};
