import { BaseStore } from 'fluxible/addons';
import Actions from '../constants/Actions';

const SITE_NAME = 'Hubrick Frontend Challenge';
const BASE_URL = 'https://hubrick-frontend-challenge.herokuapp.com';

/*
This store listens to fluxible-router's actions and keep
the content for the <head> tag. Used in server/HtmlDocument.js,
and Application.js (to change the document's title)
 */

class HtmlHeadStore extends BaseStore {

  static storeName = 'HtmlHeadStore'

  static handlers = {
    [Actions.NAVIGATE_START]: 'handleNavigateStart',
    [Actions.NAVIGATE_SUCCESS]: 'handleNavigateSuccess',
    [Actions.NAVIGATE_FAILURE]: 'handleNavigateFailure'
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.siteName = SITE_NAME;
    this.currentUrl = null;
    this.setInitialState();
  }

  setInitialState() {
    this.title = SITE_NAME;
    this.description = SITE_NAME;
    this.images = [];
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getSiteName() {
    return this.siteName;
  }

  getCurrentUrl() {
    const route = this.dispatcher.getStore('RouteStore').getCurrentRoute();
    if (!route) {
      return BASE_URL;
    }
    return `${BASE_URL}${route.get('url')}`;
  }

  getImages() {
    return this.images;
  }

  handleNavigateStart() {
    // Use a loading title when loading the route
    this.title = 'Loading ...';
    this.emitChange();
  }

  // Set the main store content according to the received route
  handleNavigateSuccess(route) {

    // Remember: route is an immutable object!

    switch (route.get('name')) {

      case 'photo':

        const id = route.getIn(['params', 'id']);

        let store = this.dispatcher.getStore('PhotoStore');
        let photo = store.get(id);

        this.title = this.formatMessage('photo.documentTitle', {
          name: photo.name,
          user: photo.user.fullname
        });

        this.description = this.formatMessage('photo.documentDescription', {
          name: photo.name,
          user: photo.user.fullname
        });

        this.images = [photo.image_url];
      break;

      case 'featured':
        const feature = route.getIn(['params', 'feature']);
        const featureName = this.formatMessage(`features.${feature}`);
        this.title = this.formatMessage('featured.documentTitle', {
          feature: featureName
        });
      break;

      default:
        // Just set the defaults
        this.setInitialState();
      break;
    }

    this.emitChange();
  }

  handleNavigateFailure(error) {
    if (error.statusCode === 404) {
      this.title = 'Page not found';
    }
    else {
      this.title = 'Error displaying this page';
    }
    this.emitChange();
  }

}

export default HtmlHeadStore;
