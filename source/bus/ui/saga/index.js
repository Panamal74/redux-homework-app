// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { types } from "../../../bus/ui/types";
import { callInitialiseWorker } from "./workers/initialise";

export const uiWatcher = Object.freeze({
    * watchInitialise () {
        yield takeEvery(types.INITIALISE, callInitialiseWorker);
    },
});
