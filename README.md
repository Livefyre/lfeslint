# LFESLINT

## Overview
Linter for Livefyre Javascript projects

## Install
npm install git+ssh://git@github.com/Livefyre/lfeslint.git

or drop it into your ``package.json``

## Usage
Running ``lfeslint`` will run the linter recurisvely in the current directory. It will skip certain directories by default.

To run on a certain path
```bash
lfeslint ./src
```

### Set environment types
lfesint defaults to a node based environment. To update the environments, add them to your package.json

```json
"lfeslint": {
  "envs": ["mocha", "commonjs"]
}

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
This project uses [`standard-engine](https://github.com/Flet/standard-engine), which in turn uses
[`eslint`](http://eslint.org/). All of the eslint directives will work - for example: `/*eslint-disable*/`

### Defining Globals in a project's  `package.json`
```js
{
  "lfeslint": {
    "global": ["var1", "Q"]
  }
}
```
