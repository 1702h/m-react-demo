import actions from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  count: 0,
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actions.TASK_CHANGAE_STATE: {
      if (typeof action.value !== 'undefined') {
        return state.setIn(action.key, action.value);
      } else {
        return state
      }
    }	    
    case actions.TASK_CHANGAE_STATE_FORMJS: {
      if (typeof action.value !== 'undefined') {
        return state.setIn(action.key, fromJS(action.value));
      } else {
        return state
      }
    }
    default:
      return state;
  }
};
