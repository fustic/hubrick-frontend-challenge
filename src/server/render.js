// Express middleware to render the app server-side and expose its state
// to the client

import React from 'react';
import serialize from 'serialize-javascript';

import app from '../app';
import HtmlDocument from '../server/htmlDocument';

import { navigateAction } from 'fluxible-router';

let webpackStats;

if (process.env.NODE_ENV === 'production') {
  webpackStats = require('../server/webpack-stats.json');
}

function renderApp(req, res, context, next) {

  if (process.env.NODE_ENV === 'development') {
    webpackStats = require('../server/webpack-stats.json');

    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve('../server/webpack-stats.json')];
  }

  // dehydrate the app and expose its state
  const state = 'window.App=' + serialize(app.dehydrate(context)) + ';';

  const Application = app.getComponent();

  try {
    // Render the Application to string
    const markup = React.renderToString(
      <Application context={ context.getComponentContext() } />
    );

    // The application component is rendered to static markup
    // and sent as response.
    const html = React.renderToStaticMarkup(
      <HtmlDocument
        context={ context.getComponentContext() }
        state={state}
        markup={markup}
        script={webpackStats.script}
        css={webpackStats.css}
      />
    );
    const doctype = '<!DOCTYPE html>';
    res.send(doctype + html);
  }
  catch (e) {
    next(e);
  }
}

function render(req, res, next) {

  // Create a fluxible context (_csrf is needed by the fetchr plugin)
  const context = app.createContext({
    req: req
  });

  // execute the navigate action to fill the RouteStore
  // (here we make use of executeAction returning a promise)
  Promise.all([
      context.executeAction(navigateAction, { url: req.url })
    ]).then(() => renderApp(req, res, context, next))
      .catch(() => renderApp(req, res, context, next));

}

export default render;
