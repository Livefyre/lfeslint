var path = require('path');
var pkg = require('./package.json');

var eslintConfig = {
  configFile: path.join(__dirname, 'eslintrc.yml')
};

module.exports = {
  cmd: 'lfeslint',
  version: pkg.version,
  tagline: 'Hint and lint',
  homepage: pkg.repository,
  bugs: pkg.repository,
  eslintConfig: eslintConfig
};
