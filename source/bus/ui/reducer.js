import { Map } from 'immutable';

import { types } from './types';

const initialState = Map({
    isTasksFetching:   false,
    searchValue:       '',
    taskEdit:          '',
    compareMethod:     true,
    animationDuration: 0.3,
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TASKS_FETCHING_STATE:
            return state.set('isTasksFetching', action.payload);
        case types.SET_TASKS_SEARCH:
            return state.set('searchValue', action.payload);
        case types.SET_TASK_EDIT:
            return state.set('taskEdit', action.payload);
        case types.SET_COMPARE_METHOD:
            return state.set('compareMethod', action.payload);
        default:
            return state;
    }
};
