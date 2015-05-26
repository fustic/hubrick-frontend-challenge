import Fluxible from 'fluxible';
import { RouteStore } from 'fluxible-router';

import routes from '../src/routes';

import Application from '../src/application';

import HtmlHeadStore from '../src/stores/htmlHeadStore';
import FlowsStore from '../src/stores/flowsStore';

// Create the fluxible app using Application as root component
const app = new Fluxible({ component: Application });

// Register a fluxible RouteStore
const AppRouteStore = RouteStore.withStaticRoutes(routes);
app.registerStore(AppRouteStore);

// Register app-specific stores
app.registerStore(HtmlHeadStore);
app.registerStore(FlowsStore);

export default app;
