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
});
