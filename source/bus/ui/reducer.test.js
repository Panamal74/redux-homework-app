import { Map } from 'immutable';

import { uiReducer } from "./reducer";
import { uiActions } from "./actions";

const initialState = Map({
    isTasksFetching:   false,
    searchValue:       '',
    taskEdit:          '',
    compareMethod:     true,
    animationDuration: 0.3,
});

describe('Тест uiReducer', () => {
    test('Должен вернуть initialState', () => {
        expect(uiReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
    });

    test('Должен вернуть SET_TASKS_FETCHING_STATE, SET_TASKS_SEARCH, SET_TASK_EDIT, SET_COMPARE_METHOD', () => {
        expect(uiReducer(undefined, uiActions.setTasksFetchingState(true))).toEqual(
            initialState.set('isTasksFetching', true)
        );
        expect(uiReducer(undefined, uiActions.setTasksSearch('ба'))).toEqual(
            initialState.set('searchValue', 'ба')
        );
        expect(uiReducer(undefined, uiActions.setTaskEdit(''))).toEqual(
            initialState.set('taskEdit', '')
        );
        expect(uiReducer(undefined, uiActions.setCompareMethod(true))).toEqual(
            initialState.set('compareMethod', true)
        );
    });
});
