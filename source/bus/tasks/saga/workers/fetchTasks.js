import { call, put } from 'redux-saga/effects';

import { url, token } from '../../../../config/api';
import { tasksActions } from '../../../../bus/tasks/actions';
import { uiActions } from "../../../ui/actions";

export function* callFetchTasksWorker () {

    try {
        yield put(uiActions.setTasksFetchingState(true));

        const response = yield call(fetch, url, {
            method:  'GET',
            headers: {
                Authorization: token,
            },
        });

        const { data: tasks, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(tasksActions.fetchTasks(tasks));
    } catch (error) {
        yield put(uiActions.emitError(error, 'fetchTaskWorker'));
    } finally {
        yield put(uiActions.setTasksFetchingState(false));
    }
}
