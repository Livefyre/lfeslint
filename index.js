#!/usr/bin/env node

/**
 * Simple CLI + setup for running eslint.
 * Owes love to https://github.com/Flet/standard-engine/blob/master/bin/cmd.js
 */

var CLIEngine = require('eslint').CLIEngine;
var deepFillIn = require('mout/object/deepFillIn');
var minimist = require('minimist');
var multiline = require('multiline');
var path = require('path');
var pkgConfig = require('pkg-config');

var opts = {
  version: require('./package.json').version,
  cmd: 'lfeslint'
};

var argv = minimist(process.argv.slice(2), {
  alias: {
    env: 'e',
    formatter: 'f',
    fix: 'F',
    global: 'g',
    help: 'h',
    ignore: 'i',
    version: 'v'
  },
  boolean: [
    'help',
    'fix',
    'version'
  ],
  string: [
    'formatter'
  ]
});

var perProjectConfig = pkgConfig('lfeslint', {
  root: false
}) || {};
argv = deepFillIn(argv, perProjectConfig);

if (argv.help) {
  console.log(multiline.stripIndent(function () {
    /*
      Usage:
          %s <flags> [FILES...]
          If FILES is omitted, then all JavaScript source files (*.js, *.jsx) in the current
          working directory are checked, recursively.
          Certain paths (node_modules/, .git/, coverage/, *.min.js, bundle.js) are
          automatically ignored.
      Flags:
          -e  --env       Environment prefixes: browser, mocha, node, commonjs, es6 (defaults to all)
          -F  --fix       Automatically fix some issues
          -f  --formatter Output results as different format types
          -g  --global    Declare global variable
          -v  --version   Show current version
          -h, --help      Show usage information
          -i, --ignore    Ignore certain paths
    */
  }), opts.cmd);
  process.exit(0);
}

if (argv.version) {
  console.log(opts.version);
  process.exit(0);
}

var cli = new CLIEngine({
  configFile: path.join(__dirname, '.eslintrc.yml'),
  extensions: ['.js', '.jsx'],
  envs: argv.env && argv.env.length ? argv.env : ['browser', 'mocha', 'node', 'commonjs', 'es6'],
  ignorePattern: ['node_modules/', '.git/', 'converage/', '*.min.js', 'dist/'].concat(argv.ignore || []),
  fix: argv.fix || false,
  globals: argv.global && argv.global.length ? argv.global : []
});

var report = cli.executeOnFiles(argv._.length ? argv._ : ['./']);
if (argv.fix) {
  CLIEngine.outputFixes(report);
}

var formatter = cli.getFormatter(argv.formatter || 'stylish');
console.log(formatter(report.results));
