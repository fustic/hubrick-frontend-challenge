
import InitActions from './pages/initActions';

import HomePage from './pages/homePage';
import FlowsPage from './pages/flowsPage';
import FlowPage from './pages/flowPage';

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
    path: "/flows/:id",
    method: "get",
    handler: FlowPage,
    action: InitActions.flowPage
  },

  // This route doesn't point to any handler.
  // I made it just as example for showing an action responding with an error
  bad: {
    path: "/bad",
    method: "get",
    action: InitActions.badPage
  }

};
