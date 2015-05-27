import InitActions from '../src/pages/initActions';
import HomePage from '../src/pages/homePage';
import FlowsPage from '../src/pages/flowsPage';
import FlowPage from '../src/pages/flowPage';

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
