// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { types } from "../../../bus/tasks/types";
import { asyncTypes } from "./asyncTypes";
import { callFetchTasksWorker } from "./workers/fetchTasks";
import { callCreateTaskWorker } from "./workers/createTask";
import { callRemoveTaskWorker } from "./workers/removeTask";
import { callLikeTaskWorker } from "./workers/likeTask";
import { callUnlikeTaskWorker } from "./workers/unlikeTask";
import { callCompleteTaskWorker } from "./workers/completeTask";
import { callUncompleteTaskWorker } from "./workers/uncompleteTask";

export const tasksWatcher = Object.freeze({
    * watchFetchTasks () {
        yield takeEvery(types.FETCH_TASKS, callFetchTasksWorker);
    },

    // create
    * watchCreateTask () {
        yield takeEvery(asyncTypes.CREATE_TASK_ASYNC, callCreateTaskWorker);
    },

    // remove
    * watchRemoveTask () {
        yield takeEvery(asyncTypes.REMOVE_TASK_ASYNC, callRemoveTaskWorker);
    },

    // like
    * watchLikeTask () {
        yield takeEvery(asyncTypes.LIKE_TASK_ASYNC, callLikeTaskWorker);
    },

    // unlike
    * watchUnlikeTask () {
        yield takeEvery(asyncTypes.UNLIKE_TASK_ASYNC, callUnlikeTaskWorker);
    },

    // complete
    * watchCompleteTask () {
        yield takeEvery(asyncTypes.COMPLETE_TASK_ASYNC, callCompleteTaskWorker);
    },

    // unlike
    * watchUncompleteTask () {
        yield takeEvery(asyncTypes.UNCOMPLETE_TASK_ASYNC, callUncompleteTaskWorker);
    },

});
