// Core
import { List, Map, fromJS } from 'immutable';
// Instruments
import { types } from "./types";

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_TASKS:
            return fromJS(action.payload);
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));
        case types.REMOVE_TASK:
            return state.filter((task) => task.get('id') !== action.payload);
        case types.CHANGE_TASK:
            return state.map((task) =>
                task.get('id') === action.payload[0].id
                    ? Map(action.payload[0])
                    : task
            );
        case types.COMPLETED_ALL:
            return state.map((task) => {
                const newValue = action.payload.filter((value) => value.id === task.get('id'));

                return newValue.length > 0 ? fromJS(newValue[0]) : task;
            });
        default: return state;
    }
};
