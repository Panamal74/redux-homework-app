// Core
import { all } from 'redux-saga/effects';

// Instruments
import { tasksWatcher } from "../bus/tasks/saga";

export function* rootSaga () {
    yield all([
        tasksWatcher.watchFetchTasks(),
        tasksWatcher.watchCreateTask(),
        tasksWatcher.watchRemoveTask(),
        tasksWatcher.watchChangeTask(),
        tasksWatcher.watchCompletedAll()
    ]);
}
