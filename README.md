# Typescript boilerplate

A small boilerplate of a minimal typescript express application with automatic client and server compilation (separate), live reload ~~and automatic testing~~.

Keywords: Typescript, gulp, nodejs, express, handlebars, sass, livereload, mocha, chai.

## Structure

The `client` directory contains all files for the client side of the application, sass and typescript/javascript files to be bundled and the handlebars templates. The bundled and compiled files will then be put into the `public` folder.

The `server` directory contains all server side scripts and modules. These files will be compiled to javascript and be put into the `dist` directory.

The `test` folder will contain all automated tests. These files are not compiled into javascript, but uses the typescript runtime environment `ts-node` instead, when running `npm test`.

## Instructions

Rename or copy `.env.example` to `.env`, change the environment variables to your setups preferences. (Currently only used by docker, not the application.)

Install [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) in Google Chrome for automatic browser reload (and make sure it is enabled).

### Without virtual environments

```bash
npm install -g nodemon typescript ts-node gulp-cli
```

```bash
# Install.
npm install

# Start server and watch for changes.
gulp watch

# Run test suite.
npm test
```

### Using Docker

```bash
docker-compose up
```

### Using Vagrant

(But really... uninstall Windows, and use Docker with a linux distro instead.)

```bash
vagrant up
vagrant ssh
docker-compose up
```

## Quirks and workarounds

### Linting errors in test scripts

To get rid of annoying TSlint errors in test files, add `"tslint.exclude": "**/test/**/*.ts"` to your user settings in VS Code.

### Port not available after application crash

When a NodeJS-application crashes, it may report that the port used (`EADDRINUSE`) is already taken when trying to restart it. The following is a way to fix that on a linux system.

```bash
ps -ax | grep node
```

The output will show something like:

```bash
6316 ?        Sl     0:00 node dist/index.js
```

Find the row with the node command to start your application and note the process number, then run:

```bash
kill -9 6316
```

### Cleaning up containers and images

**WARNING!! THIS WILL REMOVE ALL CONTAINERS AND VOLUMES! (But only _this_ image.)**

```bash
docker rm $(docker ps -a -q) && docker rmi tsexpressboilerplate_web && docker volume rm `docker volume ls -q -f dangling=true`
```
