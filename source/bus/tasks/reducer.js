// Core
import { List, fromJS } from 'immutable';
// Instruments
import { types } from "./types";

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TASKS_SUCCESS:
            return fromJS(action.payload);
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));
        case types.REMOVE_TASK:
            return state.filter((task) => task.get('id') !== action.payload);
        case types.LIKE_TASK:
            return state.updateIn(
                [
                    state.findIndex((task) => task.get('id') === action.payload),
                    'favorite'
                ],
                true
            );
        case types.UNLIKE_TASK:
            return state.updateIn(
                [
                    state.findIndex((task) => task.get('id') === action.payload),
                    'favorite'
                ],
                false
            );
        case types.COMPLETE_TASK:
            return state.updateIn(
                [
                    state.findIndex((task) => task.get('id') === action.payload),
                    'completed'
                ],
                true
            );
        case types.UNCOMPLETE_TASK:
            return state.updateIn(
                [
                    state.findIndex((task) => task.get('id') === action.payload),
                    'completed'
                ],
                false
            );
        default: return state;
    }
};
