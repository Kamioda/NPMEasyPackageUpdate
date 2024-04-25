# npm-easy-update

This package is cli application updates npm packages.

## Usage

```console
npm-easy-update <options>
```

## Options

|option|required|description|
|----|----|----|
|--exclude-dependencies|false|If it is specified, exclude all packages in "dependencies"|
|--exclude-dev-dependencies|false|If it is specified, exclude all packages in "devDependencies"|
|--exclude &lt;package names&gt;|false|Exclude reserved packages|
|--src &lt;package.json's path&gt;|false|File path of package.json. If this is not specified, package.json in the current directory will be specified.|
