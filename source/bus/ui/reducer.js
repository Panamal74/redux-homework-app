import { Map } from 'immutable';

import { types } from './types';

const initialState = Map({
    isTasksFetching: false,
    isInitialised:   false,
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TASKS_FETCHING_STATE:
            return state.set('isTasksFetching', action.payload);

        case types.INITIALISE_SUCCESS:
            return state.set('isInitialised', true);

        default:
            return state;
    }
};
