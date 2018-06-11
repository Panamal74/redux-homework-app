// Instruments
import { types } from "./types";

export const uiActions = Object.freeze({
    emitError: (error, meta = null) => ({
        type:    types.EMIT_ERROR,
        payload: error,
        error:   true,
        meta,
    }),
    initialise: () => ({
        type: types.INITIALISE,
    }),
    initialiseSuccess: () => ({
        type: types.INITIALISE_SUCCESS,
    }),
    setTasksFetchingState: (isTasksFetching) => ({
        type:    types.SET_TASKS_FETCHING_STATE,
        payload: isTasksFetching,
    }),
});
