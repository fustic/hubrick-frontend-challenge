
import React, { PropTypes, Component } from 'react';
import { provideContext, connectToStores } from 'fluxible/addons';
import { handleHistory } from 'fluxible-router';

import Page from './components/PageComponent';
import Immutable from 'immutable';

import NotFoundPage from './pages/NotFoundPage';
import ErrorPage from './pages/ErrorPage';

if (process.env.BROWSER) {
  require('./style/Application.scss');
}

class Application extends Component {

  static propTypes = {

    // props coming from fluxible-router's handleHistory
    isNavigateComplete: PropTypes.bool,
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    }),

    // prop coming from HtmlHeadStore
    documentTitle: PropTypes.string

  };

  componentDidUpdate(prevProps) {
    const { documentTitle, currentRoute } = this.props;

    if (prevProps.documentTitle !== documentTitle) {
      document.title = documentTitle;
    }

  }

  render() {
    const { currentRoute, currentNavigateError, isNavigateComplete } = this.props;

    let Handler = currentRoute && currentRoute.get('handler');

    let content;

    if (currentNavigateError && currentNavigateError.statusCode === 404) {
      // This 'not found' error comes from a page init actions (InitActions.js)
      content = <NotFoundPage />;
    }
    else if (currentNavigateError) {
      // Generic error, usually always with statusCode 500
      content = <ErrorPage err={currentNavigateError} />;
    }
    else if (!Handler) {
      // No handler: this is another case where a route is not found (e.g.
      // is not defined in the routes.js config)
      content = <NotFoundPage />;
    }
    else {
      // Here you go with the actual page content
      const params = currentRoute.get('params').toJS();
      content = <Handler {...params} />;
    }
    return (
      <Page footer={isNavigateComplete}>
        { content }
      </Page>
    );
  }

}

Application = connectToStores(Application, ['HtmlHeadStore'], (stores) => ({
    documentTitle: stores.HtmlHeadStore.getTitle()
  })
);

// Wrap with fluxible-router's history handler (required for routing)
// It also pass `currentRoute` as prop to the component
Application = handleHistory(Application);

// Wrap Application with the fluxible context (required)
Application = provideContext(Application);

export default Application;
