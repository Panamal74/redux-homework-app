// Instruments
import { types } from "./types";

export const uiActions = Object.freeze({
    emitError: (error, meta = null) => ({
        type:    types.EMIT_ERROR,
        payload: error,
        error:   true,
        meta,
    }),
    setTasksFetchingState: (isTasksFetching) => ({
        type:    types.SET_TASKS_FETCHING_STATE,
        payload: isTasksFetching,
    }),
    setTasksSearch: (search) => ({
        type:    types.SET_TASKS_SEARCH,
        payload: search,
    }),
    setTaskEdit: (id) => ({
        type:    types.SET_TASK_EDIT,
        payload: id,
    }),
    setCompareMethod: (method) => ({
        type:    types.SET_COMPARE_METHOD,
        payload: method,
    }),
});
