import InitActions from './pages/InitActions';
import HomePage from './pages/HomePage';
import FlowsPage from './pages/FlowsPage';
import FlowPage from './pages/FlowPage';

export default {

  home: {
    path: '/',
    method: 'get',
    handler: HomePage
  },
  flows: {
    path: '/flows',
    method: 'get',
    handler: FlowsPage
  },
  flow: {
    path: '/flows/:id',
    method: 'get',
    handler: FlowPage,
    action: InitActions.flowPage
  },
  // This route doesn't point to any handler.
  // I made it just as example for showing an action responding with an error
  bad: {
    path: '/bad',
    method: 'get',
    action: InitActions.badPage
  }

};
