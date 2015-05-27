# Hubrick-Frontend-Challenge

It is built on [express](http://expressjs.com) using [React](https://facebook.github.io/react) and [Flux](https://facebook.github.io/flux) with [yahoo/fluxible](http://fluxible.io). It is developed with [webpack](http://webpack.github.io) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/) and written with [babeljs](http://babeljs.io) with the help of [eslint](http://eslint.org).

**Start the app**

```bash
npm run dev
```
and open [localhost:3000](http://localhost:3000).

You can also built the app:

```bash
npm run build   # First, build for production
npm run prod    # then, run the production version
```

then open [localhost:8080](http://localhost:8080).

## Development

### Webpack

Webpack is used as commonjs module bundler, css builder (using sass-loader) and assets loader (images and svg files).

The [development config](./webpack/dev.config.js) enables source maps, the [Hot Module Replacement](http://webpack.github.io/docs/hot-module-replacement.html) and [react-hot-loader](http://gaearon.github.io/react-hot-loader/). It loads CSS styles with `<style>`, to enable styles live reload). This config is used by the [webpack-dev-server](webpack/server.js), serving the files bundled by Webpack.

The [production config](./webpack/prod.config.js) is used to build the production version with `npm run build`: similar to the dev config, it minifies the JS files, removes the `debug` statements and produces an external `.css` file. Files are served from a express static directory (i.e. `/public/assets`).

Both configs set a `process.env.BROWSER` global variable, useful to require CSS from the components, e.g:

```js
if (process.env.BROWSER) {
  require('../style/MyComponent.scss');
}
```

### Testing

To run the tests, use this command:

```
npm test
```

### Debugging

The app uses [debug](https://www.npmjs.com/package/debug) to log debug messages. You can enable/disable the logging from Node by setting the `DEBUG` environment variable before running the server:

```bash
# enable logging for hubrickFrontendChallenge and Fluxible
DEBUG=hubrickFrontendChallenge,Fluxible node index

# disable logging
DEBUG= node index
```

From the **browser**, you can enable/disable them by sending this command in the JavaScript console:

```js
debug.enable('hubrickFrontendChallenge')
debug.disable()
// then, refresh!
```


