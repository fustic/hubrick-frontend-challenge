import keyMirror from 'react/lib/keyMirror';

const Actions = keyMirror({

  ADD_FLOW: null,
  ADD_EMPTY_FLOW: null,
  ADD_FLOW_RULE: null,
  // fluxible-router actions
  NAVIGATE_START: null,
  NAVIGATE_SUCCESS: null,
  NAVIGATE_FAILURE: null

});

export default Actions;
