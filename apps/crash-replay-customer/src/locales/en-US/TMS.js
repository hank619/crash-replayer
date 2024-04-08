let mapping = {};
try {
  mapping = require('./index.json');
} catch (e) {
  mapping = {};
}

exports.format = function (msgs) {
  const results = {};
  for (const [id, msg] of Object.entries(msgs)) {
    const { defaultMessage } = msg;
    if (mapping[id]) {
      results[id] = mapping[id];
    } else {
      results[id] = defaultMessage || id;
    }
  }
  return results;
};
