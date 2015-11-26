# LFESLINT

## Overview
Linter for Livefyre Javascript projects

## Install
Drop it into your ``package.json``

or install via ``npm install git+ssh://git@github.com/Livefyre/lfeslint.git``

## Usage
Running ``lfeslint`` will run the linter recurisvely in the current directory. It will skip certain directories by default.

To run on a certain path
```bash
lfeslint ./src
```

### Command line options
```bash
-e  --env       Environment prefixes: browser, mocha, node, commonjs, es6 (defaults to all)
-F  --fix       Automatically fix some issues
-f  --formatter Output results as different format types
-g  --global    Declare global variable
-v  --version   Show current version
-h, --help      Show usage information
-i, --ignore    Ignore certain paths
```

### Ignoring Files
Certain paths - including `node_modules/**` and `*.min.js` - are ignored by default.

To add more directories to ignore, place the following in your package.json

```json
"lfeslint": {
  "ignore": [
    "**/out/**",
    "**/lib/select2/**",
    "**/lib/ckeditor/**"
  ]
}
```

### Hiding Warnings
This project uses [`ESlint`](http://eslint.org/). All of the ESlint directives will work - for example: `/*eslint-disable*/`

### Defining Globals in a project's package.json
Certain projects will need globals present to operate correctly.

```json
{
  "lfeslint": {
    "global": ["var1", "Q"]
  }
}
```

### Configuring environments
A complete list of available environments can be found in the [`Specifying Environments`](http://eslint.org/docs/user-guide/configuring#specifying-environments) section of the ESLint docs.

```json
{
  "lfeslint": {
    "env": ["mocha", "es6"]
  }
}
```

### Choosing a formatter
A complete list of available formatters can be found in the [`ESLint Formatters`](http://eslint.org/docs/user-guide/formatters/) section of the ESLint docs
