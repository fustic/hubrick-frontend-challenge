import Fluxible from 'fluxible';
import { RouteStore } from 'fluxible-router';

import routes from './routes';

import Application from './application';

import HtmlHeadStore from './stores/htmlHeadStore';
import FlowsStore from './stores/flowsStore';

// Create the fluxible app using Application as root component
const app = new Fluxible({ component: Application });

// Register a fluxible RouteStore
const AppRouteStore = RouteStore.withStaticRoutes(routes);
app.registerStore(AppRouteStore);

// Register app-specific stores
app.registerStore(HtmlHeadStore);
app.registerStore(FlowsStore);

export default app;
