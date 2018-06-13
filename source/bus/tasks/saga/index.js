// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { asyncTypes } from "./asyncTypes";
import { callFetchTasksWorker } from "./workers/fetchTasks";
import { callCreateTaskWorker } from "./workers/createTask";
import { callRemoveTaskWorker } from "./workers/removeTask";
import { callChangeTaskWorker } from "./workers/changeTask";
import { callCompletedAllWorker } from "./workers/completedAll";

export const tasksWatcher = Object.freeze({
    // fetch
    * watchFetchTasks () {
        yield takeEvery(asyncTypes.FETCH_TASKS_ASYNC, callFetchTasksWorker);
    },
    // create
    * watchCreateTask () {
        yield takeEvery(asyncTypes.CREATE_TASK_ASYNC, callCreateTaskWorker);
    },
    // remove
    * watchRemoveTask () {
        yield takeEvery(asyncTypes.REMOVE_TASK_ASYNC, callRemoveTaskWorker);
    },
    // change
    * watchChangeTask () {
        yield takeEvery(asyncTypes.CHANGE_TASK_ASYNC, callChangeTaskWorker);
    },
    // completed
    * watchCompletedAll () {
        yield takeEvery(asyncTypes.COMPLETED_ALL_ASYNC, callCompletedAllWorker);
    },
});
