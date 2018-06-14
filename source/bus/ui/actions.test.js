import { uiActions } from "./actions";
import { types } from "./types";


describe('uiActions', () => {
    test('EMIT_ERROR', () => {
        expect(uiActions.emitError({}, {})).toEqual({
            type:    types.EMIT_ERROR,
            payload: {},
            error:   true,
            meta:    {},
        });
    });
    test('SET_TASKS_FETCHING_STATE', () => {
        expect(uiActions.setTasksFetchingState(true)).toEqual({
            type:    types.SET_TASKS_FETCHING_STATE,
            payload: true,
        });
    });
    test('SET_TASKS_SEARCH', () => {
        expect(uiActions.setTasksSearch('ба')).toEqual({
            type:    types.SET_TASKS_SEARCH,
            payload: 'ба',
        });
    });
    test('SET_TASK_EDIT', () => {
        expect(uiActions.setTaskEdit('123')).toEqual({
            type:    types.SET_TASK_EDIT,
            payload: '123',
        });
    });
    test('SET_COMPARE_METHOD', () => {
        expect(uiActions.setCompareMethod(true)).toEqual({
            type:    types.SET_COMPARE_METHOD,
            payload: true,
        });
    });
});
